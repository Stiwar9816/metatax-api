import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UpdateUserInput } from './dto';
import { User } from './entities/user.entity';
import { UserRoles } from '../auth/enums';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}


  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

 
  @Query(() => User, {
    name: 'user',
    description: 'Search for a user by a unique ID',
  })
  @UseGuards(JwtAuthGuard)
  findOne(
    @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
    @CurrentUser([UserRoles.Administrador, UserRoles.superAdmin]) user: User,
  ): Promise<User> {
    return this.userService.findOneById(id);
  }


  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.remove(id);
  }
}
