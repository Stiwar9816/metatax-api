import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //EndPoint Register users
  @Post('register')
  craate(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  //EndPoint Login users
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
