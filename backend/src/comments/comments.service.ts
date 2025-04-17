import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { Like } from '../entities/like.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Like) private likeRepo: Repository<Like>,
  ) {}

  async create(postId: number, dto: CreateCommentDto, user: User) {
    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found');

    const comment = this.commentRepo.create({
      content: dto.content,
      author: user,
      post,
    });

    return this.commentRepo.save(comment);
  }

  async getByPost(postId: number, user: User) {
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
  
        const liked = await this.likeRepo.findOne({
          where: {
            comment: { id: comment.id },
            user: { id: user.id },
          },
        });
  
        return {
          ...comment,
          likeCount,
          likeByMe: !!liked,
        };
      }),
    );
  
    return enrichedComments;
  }
  
}
