import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Post, (post) => post.likes, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.likes, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  comment: Comment;

  @CreateDateColumn()
  createdAt: Date;
}
