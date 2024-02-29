import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
@Module({
  providers: [UserResolver, UserService],
  imports: [TypeOrmModule.forFeature([User]),PassportModule.register({defaultStrategy: 'jwt'}),],
  exports: [ UserService]
})
export class UserModule {}
