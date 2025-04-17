import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag.entity';
import { Repository } from 'typeorm';
import { FilterPostsDto } from '../posts/dto/filter-post.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tagRepo: Repository<Tag>,
  ) {}

  async findAll(filterPostsDto: FilterPostsDto, user: User) {
    const { onlyMine } = filterPostsDto;

    // Kalo mau ambil tag berdasarkan post milik sendiri:
    if (onlyMine) {
      return this.tagRepo
        .createQueryBuilder('tag')
        .leftJoin('tag.posts', 'post') // assuming many-to-many
        .where('post.userId = :userId', { userId: user.id })
        .getMany();
    }

    // Ambil semua tag
    return this.tagRepo.find();
  }
}
