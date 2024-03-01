import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { getCfdiClass } from './cfdi.entity';

@Entity({ name: 'related_cfdi' })
@ObjectType()
export class RelatedCfdi {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: '' })
  related_cfdi_id: string;

  @Column('int')
  @Field(() => Int, { description: '' })
  type_relation: number;

  @Column('uuid', { unique: true })
  @Field(() => String, { description: '' })
  uuid: string;

  // Relations
  @OneToMany(() => getCfdiClass(), (cfdi) => cfdi.related_cfdi)
  cfdi: ReturnType<typeof getCfdiClass>;
}
