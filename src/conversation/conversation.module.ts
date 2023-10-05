import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { Conversation } from './entities/conversation.entity';
import { UsersService } from 'src/users/users.service';
import { Chat } from '../chats/entities/chat.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, User])],
  controllers: [ConversationController],
  providers: [ConversationService, UsersService]
})
export class ConversationModule { }
