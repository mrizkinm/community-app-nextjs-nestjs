import { Controller, Post, Body, UseGuards, Get, Query, Param } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { UserGuard } from '../common/guards/user.guard';
import { User } from '../common/decorators/user.decorator';
import { FilterPostsDto } from './dto/filter-post.dto';

@Controller('api/user/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(UserGuard)
  create(@Body() dto: CreatePostDto, @User() user) {
    return this.postsService.create(dto, user);
  }

  @Get()
  @UseGuards(UserGuard)
  getPosts(@Query() filterPostsDto: FilterPostsDto, @User() user) {
    return this.postsService.findPosts(filterPostsDto, user);
  }

  @Get(':postId')
  @UseGuards(UserGuard)
  getDetailPosts(@Param('postId') id: number, @User() user) {
    return this.postsService.findDetailPost(id, user);
  }
}
