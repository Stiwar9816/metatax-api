import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { getCfdiClass } from './cfdi.entity';


@Entity({name: 'receptors'})
@ObjectType({
  description: 'Scheme where user receptor information is stored of the services of sat' 
})
export class Receptors {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  receptor_id: number;

  @Column('text')
  @Field(()=>String)
  rfc:string;

  @Column('text')
  @Field(()=>String)
  name: string;

  @Column('int')
  @Field(()=>Int)
  recipient_fiscal_address: number;

  @Column('int')
  @Field(()=>Int)
  recipient_fiscal_regime: number;

  @Column('text')
  @Field(()=>String)
  cfdi_use: string;

  @ManyToOne(()=> getCfdiClass(), cfdi=> cfdi.receptors)
  cfdi: ReturnType<typeof getCfdiClass>;

}
