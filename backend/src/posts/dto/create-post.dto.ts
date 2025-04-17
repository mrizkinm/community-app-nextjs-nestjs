import { IsNotEmpty, IsArray, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[]; // contoh: ["tech", "life"]
}