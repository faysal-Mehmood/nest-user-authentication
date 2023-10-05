import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { Chat } from './entities/chat.entity';
import { ConversationService } from '../conversation/conversation.service';
import { Conversation } from '../conversation/entities/conversation.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Chat, Conversation, User])],
  controllers: [ChatsController],
  providers: [ChatsService, ConversationService, UsersService]
})
export class ChatsModule { }
