import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[TypeOrmModule,JwtStrategy, PassportModule, JwtModule, AuthService],
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService)=>{
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions:{
            expiresIn: '1h'
          }
        }
      }
    })
  ],
})
export class AuthModule {}
