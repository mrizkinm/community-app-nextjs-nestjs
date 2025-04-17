import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Tag } from 'src/entities/tag.entity';
import { Like } from 'src/entities/like.entity';
import { Comment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [TypeOrmModule.forFeature([Post, Tag, Like, Comment, User])]
})
export class PostsModule {}
