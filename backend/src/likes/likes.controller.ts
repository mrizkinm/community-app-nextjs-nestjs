import { Controller, Post, Body, Param, UseGuards, Get } from '@nestjs/common';
import { LikesService } from './likes.service';
import { UserGuard } from '../common/guards/user.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('api/user/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('post/:id')
  @UseGuards(UserGuard)
  togglePostLike(@Param('id') id: number, @User() user) {
    return this.likesService.togglePostLike(+id, user.id);
  }

  @Post('comment/:id')
  @UseGuards(UserGuard)
  toggleCommentLike(@Param('id') id: number, @User() user) {
    return this.likesService.toggleCommentLike(+id, user.id);
  }
}
