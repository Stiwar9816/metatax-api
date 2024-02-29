import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Field } from '@nestjs/graphql';

export class UpdateAuthDto extends PartialType(CreateUserDto) {
    @Field(() => String)
  id: string;
}
