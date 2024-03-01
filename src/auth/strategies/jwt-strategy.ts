import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // validate if the user has a required token
  async validate(payload: JwtPayload): Promise<User> {
    const { id, roles } = payload;
    const user = await this.userRepository.findOneBy({id});
    if (!user) throw new UnauthorizedException('El token no es valido');
    if (!user.isActive) throw new UnauthorizedException('Usuario innactivo, comuniquese con un administrador');

    user.roles = roles;
    delete user.password;

    return user;
  }
}
