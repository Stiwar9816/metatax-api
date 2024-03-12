import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateFielDto,
  LoginUserDto,
  UpdatePasswordAuthDto,
} from './dto';
import { CurrentUser } from './decorators';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../common/validations/file-validation.pipe';

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

  @Post('fiel')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file_certificated', maxCount: 1 },
      { name: 'file_key', maxCount: 1 },
    ]),
  )
  updateFiel(
    @Body() fileDto: UpdateFielDto,
    @CurrentUser() user: User,
    @UploadedFiles(new FileValidationPipe())
    files: {
      file_certificated: Express.Multer.File[];
      file_key: Express.Multer.File[];
    },
  ) {
    return this.authService.uploadFiles(fileDto, files, user.id);
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
