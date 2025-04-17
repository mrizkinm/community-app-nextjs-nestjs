import { Controller, Post, Param, Body, Get, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserGuard } from '../common/guards/user.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('api/user/comments/:postId')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(UserGuard)
  create(
    @Param('postId') postId: number,
    @Body() dto: CreateCommentDto,
    @User() user,
  ) {
    return this.commentsService.create(postId, dto, user);
  }

  @Get()
  @UseGuards(UserGuard)
  getAll(@Param('postId') postId: number, @User() user) {
    return this.commentsService.getByPost(postId, user);
  }
}
