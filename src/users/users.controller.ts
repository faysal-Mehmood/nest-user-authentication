import {
  Controller,
  Get,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RegisterUserDto } from './register-user.dto';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@Controller('v1/api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  findAll() {
    return this.userService.findAllUser();
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.userService.findOne(+id,);
    return { user: { ...data } }
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() registerUserDto: RegisterUserDto) {
    return this.userService.update(+id, registerUserDto);
  }

  @Patch(':id')
  async partialUpdate(@Param('id') id: string, @Body() registerUserDto: RegisterUserDto) {
    const data = await this.userService.updatePartialUser(+id, registerUserDto);
    return { user: { ...data } }
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedUser = await this.userService.removeUser(+id)
    return deletedUser

  }
}