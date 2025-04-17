import { IsOptional, IsString } from 'class-validator';

export class FilterPostsDto {
  @IsOptional()
  @IsString()
  onlyMine?: string;

  @IsOptional()
  @IsString()
  tag?: string;
}
