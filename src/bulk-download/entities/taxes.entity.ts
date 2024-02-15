import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Retentions } from '.';
import { getCfdiClass } from './cfdi.entity';

@Entity({name: 'taxes'})
@ObjectType()
export class Taxes {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => Int, { description: 'Example field (placeholder)' })
  tax_id: number;

  @Column('float8')
  @Field(()=>Float)
  base: number;

  @Column('int')
  @Field(()=>Int)
  tax: number;

  @Column('text')
  @Field(()=>String)
  tax_type:string;

  @Column('float8')
  @Field(()=>Float)
  rate:number;

  @Column('float8')
  @Field(()=>Float)
  amout:number;

  @ManyToOne(() => getCfdiClass(), cfdi => cfdi.taxes)
  cfdi: ReturnType<typeof getCfdiClass>;

  @OneToMany(() => Retentions, retention => retention.taxes)
  retentions: Retentions[];
}
export const getTaxesClass = () => Taxes;