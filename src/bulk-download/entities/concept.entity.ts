import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { getCfdiClass } from './cfdi.entity';

@Entity({name:'concepts'})
@ObjectType()
export class Concepts {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Scheme where user concepts information is stored of the services of sat' })
  concept_id: string;

  @Column('int')
  @Field(()=>Int)
  product_service_code: number;
  
  @Column('int')
  @Field(()=>Int)
  quantity:number;
  
  @Column('text')
  @Field(()=>String)
  unit_code:string;
  
  @Column('text')
  @Field(()=>String)
  unit: string;
  
  @Column('text')
  @Field(()=>String)
  description: string;
  
  @Column('float8')
  @Field(()=>Float)
  unit_value: number;
  
  @Column('float8')
  @Field(()=>Float)
  amount: number;
  
  @Column('int')
  @Field(()=>Int)
  tax_object:number;

  @ManyToOne(()=> getCfdiClass(), cfdi => cfdi.concepts)
  cfdi: ReturnType<typeof getCfdiClass>;
  
}
