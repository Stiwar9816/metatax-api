import { registerEnumType } from '@nestjs/graphql';

// Enum Valid roles users
export enum UserRoles {
  Administrador = 'Administrador',
  Usuario = 'Usuario',
  superAdmin = 'superAdmin',
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
  description:
    'Roles permitidos en el sistema [superAdmin, Administrador,Usuario]',
});
