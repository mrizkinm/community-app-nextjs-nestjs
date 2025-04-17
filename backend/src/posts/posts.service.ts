import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { Tag } from '../entities/tag.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../entities/user.entity';
import { Like } from '../entities/like.entity';
import { Comment } from '../entities/comment.entity';
import { FilterPostsDto } from './dto/filter-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Tag) private tagRepo: Repository<Tag>,
    @InjectRepository(Like) private likeRepo: Repository<Like>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async create(dto: CreatePostDto, user: User) {
    // cari atau buat tag satu-satu
    const tags = await Promise.all(
      dto.tags.map(async (name) => {
        name = name.trim(); // Bersihkan spasi
        let tag = await this.tagRepo.findOne({ where: { name } });
        if (!tag) {
          tag = this.tagRepo.create({ name });
          await this.tagRepo.save(tag);
        }
        return tag;
      }),
    );

    const post = this.postRepo.create({
      title: dto.title,
      content: dto.content,
      author: { id: user.id },
      tags,
    });

    return await this.postRepo.save(post);
  }

  async findPosts(dto: FilterPostsDto, user: User) {
    const { tag, onlyMine } = dto;
  
    // Pastikan user.id ada dan valid
    if (!user?.id) {
      throw new Error('User ID is missing or invalid');
    }
  
    const query = this.postRepo.createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'user')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('post.likes', 'like')
      .leftJoinAndSelect('like.user', 'likeUser')
      .orderBy('post.createdAt', 'DESC');
  
    if (onlyMine == 'true') {
      // Hanya post yang dibuat oleh user, apapun statusnya
      query.where('post.author = :userId', { userId: user.id });
    } else {
      // Semua post yang diapprove + post sendiri meskipun belum approve
      query.where('post.status = true', { userId: user.id });
    }
  
    if (tag) {
      query.andWhere('tag.name = :tagName', { tagName: tag });
    }
  
    // Ambil semua posts yang sudah disaring
    const posts = await query.getMany();
  
    // Iterasi untuk setiap post dan hitung jumlah like dan comment secara manual
    for (const post of posts) {
      const likeCount = post.likes.length;
  
      const commentCount = await this.commentRepo.count({
        where: { post: { id: post.id } },
      });
  
      // Cek apakah user yang login sudah nge-like post ini
      const likeByMe = post.likes.some(like => like.user.id === user.id);
  
      post['likeCount'] = likeCount;
      post['commentCount'] = commentCount;
      post['likeByMe'] = likeByMe;
    }
  
  
    return posts;
  }

  async findDetailPost(id: number, user: User) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['author', 'tags'],
    });
  
    if (!post) throw new NotFoundException('Post not found');
  
    // Hitung jumlah like & comment
    const [likeCount, commentCount, liked] = await Promise.all([
      this.likeRepo.count({ where: { post: { id } } }),
      this.commentRepo.count({ where: { post: { id } } }),
      this.likeRepo.findOne({
        where: {
          post: { id },
          user: { id: user.id },
        },
      }),
    ]);
  
    // Hapus password dari author
    const { password, ...authorWithoutPassword } = post.author;
  
    return {
      ...post,
      author: authorWithoutPassword,
      likeCount,
      commentCount,
      likeByMe: !!liked
    };
  }  
  
}
