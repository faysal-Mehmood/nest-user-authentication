// chat.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Conversation } from '../../conversation/entities/conversation.entity';

export enum ChatType {
  input = 'input',
  output = 'output',
}


@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  audioUrlText: string

  @Column()
  sorted: number

  @Column({
    type: 'enum',
    enum: ChatType,
  })
  type: ChatType;


  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Conversation, (conversation) => conversation.chats)
  conversation: Conversation;
}
