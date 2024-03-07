import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdatePasswordAuthDto } from './dto';
import { CurrentUser } from './decorators';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  @Post('update-password')
  @UseGuards(JwtAuthGuard)
  updatePassword(
    @Body() updateUserPasswordDto: UpdatePasswordAuthDto,
    @CurrentUser() user: User,
  ): any {
    return this.authService.updatePassword(updateUserPasswordDto, user.id);
  }
}
