import { registerEnumType } from "@nestjs/graphql";


//Enum of document type users
export enum DocumentType{
    CITIZENSHIP_CARD = 'Cedula de ciudadania',
    PASSPORT = 'Pasaporte' 
}

registerEnumType(DocumentType, {
    name: 'DocumentType',
    description:
      'Document type allowed in the system [Cedula de ciudadania, Pasaporte]',
  });
  