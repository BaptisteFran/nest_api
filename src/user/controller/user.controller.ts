import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user.model';
import { CreateUserDto } from '../CreateUserDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SearchUserDto } from '../SearchUserDto';
import { Like } from 'typeorm';

@Controller('users')
export class UserController extends User {
  private readonly users: User;

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const user = await User.find();
    return user;
  }

  @Post()
  // utiliser bcrypt pour hasher le password
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = new User();
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = hash;

    return user.save();
  }

  @UseGuards(AuthGuard)
  @Get('/search')
  async search(@Query() query: SearchUserDto) {
    const user = User.find({
      where: [
        { username: Like(`%${query.searchreq}%`) },
        { email: Like(`%${query.searchreq}%`) },
      ],
    });
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async findOne(@Param('id') id?: number): Promise<User> {
    const user = await User.findOneBy({
      id: id,
    });
    return user;
  }
}
