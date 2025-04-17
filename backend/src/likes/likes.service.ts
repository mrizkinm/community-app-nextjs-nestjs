import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likeRepo: Repository<Like>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async togglePostLike(postId: number, userId: number) {
    const existing = await this.likeRepo.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (existing) {
      await this.likeRepo.remove(existing);
      return { liked: false };
    }

    const post = await this.postRepo.findOneBy({ id: postId });
    if (!post) throw new NotFoundException('Post not found');

    const like = this.likeRepo.create({ post, user: { id: userId } });
    await this.likeRepo.save(like);
    return { liked: true };
  }

  async toggleCommentLike(commentId: number, userId: number) {
    const existing = await this.likeRepo.findOne({
      where: { comment: { id: commentId }, user: { id: userId } },
    });

    if (existing) {
      await this.likeRepo.remove(existing);
      return { liked: false };
    }

    const comment = await this.commentRepo.findOneBy({ id: commentId });

    if (!comment) throw new NotFoundException('comment not found');
    const like = this.likeRepo.create({ comment, user: { id: userId } });
    await this.likeRepo.save(like);
    return { liked: true };
  }
}
