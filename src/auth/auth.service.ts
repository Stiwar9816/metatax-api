import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    // private readonly userService: UserService
    private readonly jwtService: JwtService,
  ) {}

  private getToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async create(createAuthDto: CreateUserDto) {
    try {
      const { password, ...userInfo } = createAuthDto;
      const user = this.authRepository.create({
        ...userInfo,
        password: bcrypt.hashSync(password, 12),
      });
      await this.authRepository.save(user);
      delete user.password;

      const token = this.getToken({
        id: user.id,
        email: user.email,
        name: user.name,
        last_name: user.last_name,
        roles: user.roles,
      });

      return {
        ...user,
        token,
      };
    } catch (error) {
      this.handleDBErrros(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email, rfc } = loginUserDto;
    //TODO: Chague authRepository for UserService
    const user = await this.authRepository.findOne({
      where: [{ rfc }, { email }],
      select: { email: true, rfc: true, password: true, id:true,name:true, roles:true},
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (RFC)');
    if (user.email !== email)
      throw new UnauthorizedException('Credentials are not valid (Email)');
    if (user.rfc !== rfc)
      throw new UnauthorizedException('Credentials are not valid (RFC)');

    await this.validateUser(user.rfc);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Password not match');
    }
    delete user.password;

    const token = this.getToken({
      id: user.id,
      email: user.email,
      name: user.name,
      last_name: user.last_name,
      roles: user.roles,
    });

    return {
      ...user,
      token,
    };
  }

  async validateUser(rfc: string): Promise<User> {
    //TODO: Chague authRepository for UserService
    const user = await this.authRepository.findOneByOrFail({ rfc });
    if (!user.isActive)
      throw new UnauthorizedException(
        `El usuario(a) está inactivo, habla con un administrador.`,
      );

    delete user.password;
    return user;
  }
  private handleDBErrros(errors: any): never {
    if (errors.code === '23505') {
      throw new BadRequestException(errors.detail);
    }
    console.log(errors);
    throw new InternalServerErrorException('Please check server logs');
  }
}
