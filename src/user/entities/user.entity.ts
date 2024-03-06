import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { DocumentType } from '../../../src/auth/enums/user-document-type.enum';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'text' })
  @Field(() => String)
  name: string;

  @Column({ type: 'text' })
  @Field(() => String)
  last_name: string;

  @Column({ type: 'text' })
  @Field(() => String)
  zip: string;

  @Column({ type: 'enum', enum: DocumentType })
  @Field(() => DocumentType)
  document_type: DocumentType;

  @Column({ type: 'bigint', unique: true })
  @Field(() => Float)
  document_num: number;

  @Column({ type: 'bigint', unique: true })
  @Field(() => Float)
  phone: number;

  @Column({ type: 'text', unique: true })
  @Field(() => String)
  rfc: string;

  @Column({ type: 'text', unique: true })
  @Field(() => String)
  email: string;

  @Column({ type: 'text' })
  @Field(() => String)
  password: string;

  @Column({ type: 'bool', default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @Column({ type: 'bytea' })
  file_certificated: Buffer;

  @Column({ type: 'bytea' })
  file_key: Buffer;

  @Column({ type: 'text' })
  signature_password: String;

  @Column({ type: 'text', array: true, default: ['user'] })
  @Field(() => [String])
  roles: string[];

  // Convertimos los datos del email a minúsculas
  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.email = this.email.toLowerCase().trim();
  }
}
