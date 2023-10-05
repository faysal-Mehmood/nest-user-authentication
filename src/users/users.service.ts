import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const { username, password, email, firstName, lastName } = registerUserDto;
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User already exist');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName

    return this.userRepository.save(user);
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
  updatePartialUser(id: number, registerUserDto: RegisterUserDto): Promise<User> {
    const user: User = new User();
    user.username = registerUserDto.username;
    user.email = registerUserDto.email;
    user.firstName = registerUserDto.firstName;
    user.lastName = registerUserDto.lastName;
    user.id = id;
    return this.userRepository.save(user);
  }
  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }
  async removeUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async update(id: number, registerUserDto: RegisterUserDto): Promise<User> {
    await this.userRepository.update(id, registerUserDto);
    return this.userRepository.findOne({ where: { id } });
  }
}
