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
import { CreateUserDto, LoginUserDto, UpdatePasswordAuthDto } from './dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UpdateFielDto } from './dto/update-fiel.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly userService: UserService,
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
      select: {
        email: true,
        rfc: true,
        password: true,
        id: true,
        name: true,
        roles: true,
      },
    });

    if (!user) throw new UnauthorizedException('El Usuario no existe!');
    if (user.email !== email)
      throw new UnauthorizedException('La credencial (Email) no es correcta');
    if (user.rfc !== rfc)
      throw new UnauthorizedException('La credencial (RFC) no es correcta');

    await this.validateUser(user.rfc);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Su contraseña es incorrecta');
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

  async updatePassword(updaUserPasswordDto: UpdatePasswordAuthDto, id: string) {
    const { password, newPassword, confirmPassword } = updaUserPasswordDto;
    const findUser = await this.authRepository.findOneBy({ id });

    if (!bcrypt.compareSync(password, findUser.password))
      throw new BadRequestException('Su contraseña actual no coincide');

    if (bcrypt.compareSync(newPassword, findUser.password))
      throw new BadRequestException(
        'Su contraseña actual y la nueva son identicas',
      );

    if (newPassword !== confirmPassword)
      throw new BadRequestException(
        'Su nueva contraseña no coincide con su confirmación',
      );
    try {
      const updateUser = await this.authRepository.preload({
        ...findUser,
      });
      updateUser.password = bcrypt.hashSync(newPassword, 12);

      return await this.authRepository.save(updateUser);
    } catch (error) {
      this.handleDBErrros(error);
    }
  }

  async uploadFiles(fileDto: UpdateFielDto, files, id: string) {
    const { signature_password } = fileDto;
    const findUser = await this.userService.findOneById(id);
    if (!files?.file_key || !files?.file_certificated)
      throw new BadRequestException(
        'Asegurese de ingresar un certificado y una llave valida',
      );
    try {
      const updateFileUser = await this.authRepository.preload({
        ...findUser,
      });
      updateFileUser.file_certificated = files?.file_certificated[0].buffer;
      updateFileUser.file_key = files?.file_key[0].buffer;
      updateFileUser.signature_password = signature_password;
      return await this.authRepository.save(updateFileUser);
    } catch (error) {
      this.handleDBErrros(error);
    }
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
