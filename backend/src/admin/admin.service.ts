import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { Like } from 'src/entities/like.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(Like) private likeRepo: Repository<Like>,
  ) {}

  // Approve post
  async approvePost(postId: number) {
    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');
    post.status = true;
    return this.postRepo.save(post);
  }

  // Delete post
  async deletePost(postId: number) {
    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');
    return this.postRepo.remove(post);
  }

  // Delete comment
  async deleteComment(commentId: number) {
    const comment = await this.commentRepo.findOne({ where: { id: commentId } });
    if (!comment) throw new NotFoundException('Comment not found');
    return this.commentRepo.remove(comment);
  }

  async getAnalytics() {
    const postCount = await this.postRepo.count();
    const commentCount = await this.commentRepo.count();
    const userCount = await this.userRepo.count();

    return {
      totalPosts: postCount,
      totalComments: commentCount,
      totalUsers: userCount,
    };
  }

  async getAllPosts() {
    return this.postRepo.find({
      relations: ['author', 'tags'],  // Menambahkan relasi jika diperlukan
    });
  }

  async getAllComments() {
    return this.commentRepo.find({
      relations: ['author', 'post'],  // Menambahkan relasi jika diperlukan
    });
  }

  async findPosts() {
    const query = this.postRepo.createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'user')
      .leftJoinAndSelect('post.tags', 'tag')
      .orderBy('post.createdAt', 'DESC');
  
    // query.where('post.status = false');

    // Ambil semua posts yang sudah disaring
    const posts = await query.getMany();
  
    // Iterasi untuk setiap post dan hitung jumlah like dan comment secara manual
    for (const post of posts) {
      // Hitung jumlah like
      const likeCount = await this.likeRepo.count({ where: { post: { id: post.id } } });
  
      // Hitung jumlah comment
      const commentCount = await this.commentRepo.count({ where: { post: { id: post.id } } });
  
      // Tambahkan likeCount dan commentCount ke dalam post
      post['likeCount'] = likeCount;
      post['commentCount'] = commentCount;
    }
  
    return posts;
  }

  async findDetailPost(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['author', 'tags'],
    });
  
    if (!post) throw new NotFoundException('Post not found');
  
    // Hitung jumlah like & comment
    const [likeCount, commentCount] = await Promise.all([
      this.likeRepo.count({ where: { post: { id } } }),
      this.commentRepo.count({ where: { post: { id } } }),
    ]);
  
    // Hapus password dari author
    const { password, ...authorWithoutPassword } = post.author;
  
    return {
      ...post,
      author: authorWithoutPassword,
      likeCount,
      commentCount,
    };
  }

  async getByPost(postId: number) {
    // Ambil semua komentar dari post tertentu
    const comments = await this.commentRepo.find({
      where: { post: { id: postId } },
      relations: ['author'], // kalau mau tampilkan nama author juga
      order: { createdAt: 'DESC' },
    });
  
    // Tambahkan jumlah like untuk tiap komentar
    const enrichedComments = await Promise.all(
      comments.map(async (comment) => {
        const likeCount = await this.likeRepo.count({
          where: { comment: { id: comment.id } },
        });
  
        return {
          ...comment,
          likeCount,
        };
      }),
    );
  
    return enrichedComments;
  }
}
