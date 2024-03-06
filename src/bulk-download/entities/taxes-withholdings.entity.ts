import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { getCfdiClass } from './cfdi.entity';

@Entity({ name: 'taxes_withholdings' })
@ObjectType()
export class TaxesWithholdings {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Example field (placeholder)' })
  retention_id: string;

  @Column('float4')
  @Field(() => Float, {
    description: '',
  })
  tax: number;

  @Column('float4')
  @Field(() => Float, {
    description: '',
  })
  amout: number;

  @Column('float4')
  @Field(() => Float, {
    description: '',
  })
  total_withheld: number;

  // Relations
  @OneToMany(() => getCfdiClass(), (cfdi) => cfdi.taxes_withholdings)
  cfdi: ReturnType<typeof getCfdiClass>;
}
