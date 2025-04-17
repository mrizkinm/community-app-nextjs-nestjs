import { Controller, Post, Param, Delete, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Approve post
  @Post('approve-post/:postId')
  @UseGuards(AdminGuard)
  approvePost(@Param('postId') postId: number) {
    return this.adminService.approvePost(postId);
  }

  // Delete post
  @Delete('delete-post/:postId')
  @UseGuards(AdminGuard)
  deletePost(@Param('postId') postId: number) {
    return this.adminService.deletePost(postId);
  }

  // Delete comment
  @Delete('delete-comment/:commentId')
  @UseGuards(AdminGuard)
  deleteComment(@Param('commentId') commentId: number) {
    return this.adminService.deleteComment(commentId);
  }

  // Get analytics
  @Get('analytics')
  @UseGuards(AdminGuard)
  getAnalytics() {
    return this.adminService.getAnalytics();
  }

  // Get Post
  @Get('posts')
  @UseGuards(AdminGuard)
  getPosts() {
    return this.adminService.findPosts();
  }

  // Get Detail Post
  @Get('posts/:postId')
  @UseGuards(AdminGuard)
  getDetailPosts(@Param('postId') id: number) {
    return this.adminService.findDetailPost(id);
  }

  // Get Comments List
  @Get('comments/:postId')
  @UseGuards(AdminGuard)
  getAll(@Param('postId') postId: number) {
    return this.adminService.getByPost(postId);
  }

}
