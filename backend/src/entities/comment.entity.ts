import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { Like } from './like.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments, { eager: true, onDelete: 'CASCADE' })
  author: User;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE'})
  post: Post;

  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];
}
