import { registerEnumType } from '@nestjs/graphql';

//Enum of document type users
export enum DocumentType {
  CITIZENSHIP_CARD = 'Cedula de ciudadania',
  PASSPORT = 'Pasaporte',
}

registerEnumType(DocumentType, {
  name: 'DocumentType',
  description:
    'Tipo de documento permitido en el sistema [Cedula de ciudadania, Pasaporte]',
});
