import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Conversation } from '../conversation/entities/conversation.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ length: 30, nullable: true })
  firstName: string;

  @Column({ length: 15, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', nullable: true, length: 40 })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversations: Conversation[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
