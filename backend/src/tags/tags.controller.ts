import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { UserGuard } from '../common/guards/user.guard';
import { User } from '../common/decorators/user.decorator';
import { FilterPostsDto } from '../posts/dto/filter-post.dto'; // optional kalau mau filter
import { User as UserEntity } from 'src/entities/user.entity';

@Controller('api/user/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @UseGuards(UserGuard)
  getAll(@Query() filterPostsDto: FilterPostsDto, @User() user: UserEntity) {
    return this.tagsService.findAll(filterPostsDto, user);
  }
}
