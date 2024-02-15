import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { getTaxesClass } from './taxes.entity';


@Entity({name: 'retentions'})
@ObjectType()
export class Retentions {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => Int, { description: 'Example field (placeholder)' })
  retention_id: number;

  @Column('int')
  @Field(()=>Int)
  tax: number;

  @Column('float8')
  @Field(()=>Float)
  amout:number;

  @ManyToOne(() => getTaxesClass(), tax => tax.tax)
  @JoinColumn({name: 'taxId'})
  taxes: ReturnType<typeof getTaxesClass>;
}
