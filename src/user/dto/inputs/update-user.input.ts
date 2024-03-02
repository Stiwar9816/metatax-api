import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateUserDto } from '../../../auth/dto/create-user.dto';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserDto) {
  @IsUUID()
  @Field(() => String)
  id: string;
}
