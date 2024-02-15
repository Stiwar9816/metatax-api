import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { getCfdiClass } from './cfdi.entity';


@Entity({name: 'transmitter'})
@ObjectType({
  description: 'Scheme where user trasnmitter information is stored of the services of sat' 
})
export class Transmitter {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  transmitter_id: number;

  @Column('text')
  @Field(()=>String)
  rfc:string;

  @Column('text')
  @Field(()=>String)
  name: string;

  @Column('int')
  @Field(()=>Int)
  fiscal_regime: number;

  @ManyToOne(() => getCfdiClass(), cfdi => cfdi.transmitters)
  cfdi: ReturnType<typeof getCfdiClass>;

}
