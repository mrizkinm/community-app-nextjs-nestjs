import { Controller, Post, Body, Param, UseGuards, Get } from '@nestjs/common';
import { LikesService } from './likes.service';
import { UserGuard } from '../common/guards/user.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('api/user/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('post/:postId')
  @UseGuards(UserGuard)
  togglePostLike(@Param('postId') id: number, @User() user) {
    return this.likesService.togglePostLike(+id, user.id);
  }

  @Post('comment/:commentId')
  @UseGuards(UserGuard)
  toggleCommentLike(@Param('commentId') id: number, @User() user) {
    return this.likesService.toggleCommentLike(+id, user.id);
  }
}
