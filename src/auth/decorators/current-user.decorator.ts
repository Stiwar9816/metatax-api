import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRoles } from '../enums';
import { User } from '../../user/entities/user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

//Validation of user with roles required for EndPoint

export const CurrentUser = createParamDecorator(
  (roles: UserRoles[] = [], ctx: ExecutionContext) => {
    // Validation with HTTP request
    const getUserFromHttpContext = (context: ExecutionContext): User => {
      const request = context.switchToHttp().getRequest();
      return request.user;
    };
    // Validation with GraphQL request
    const getUserFromGraphqlContext = (context: ExecutionContext): User => {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req.user;
    };

    // Calls from the functions for validation
    const getUser = (context: ExecutionContext): User => {
      if (context.getType() === 'http') {
        return getUserFromHttpContext(context);
      } else {
        return getUserFromGraphqlContext(context);
      }
    };

    const user: User = getUser(ctx);
    //Validation of errors
    if (!user) {
      throw new InternalServerErrorException(
        `No hay usuario dentro de la solicitud: asegúrese de que haya utilizado AuthGuard`,
      );
    }

    // Valid length of roles
    if (roles.length === 0) {
      return user;
    }
    // Obtain the roles of the current user and validate them if they are the ones set in the app.
    for (const role of user.roles) {
      if (roles.includes(role as UserRoles)) {
        return user;
      }
    }

    throw new ForbiddenException(
      `Usuario: ${user.name} ${user.last_name} necesita tener alguno de los siguientes roles: ${roles}`,
    );
  },
);
