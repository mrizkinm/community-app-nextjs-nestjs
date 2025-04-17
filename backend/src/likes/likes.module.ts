import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from 'src/entities/like.entity';
import { Post } from 'src/entities/post.entity';
import { Comment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [TypeOrmModule.forFeature([Like, Post, Comment, User])]
})
export class LikesModule {}
