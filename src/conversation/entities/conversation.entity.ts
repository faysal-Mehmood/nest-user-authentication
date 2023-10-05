
// conversation.entity.ts
import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { Chat } from '../../chats/entities/chat.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 40 })
  title: string;


  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.conversations)
  user: User;

  @OneToMany(() => Chat, (chat) => chat.conversation)
  chats: Chat[];
}
