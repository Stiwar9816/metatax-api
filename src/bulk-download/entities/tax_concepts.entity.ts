import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { getConceptClass } from './concept.entity';

@Entity({ name: 'tax_concepts' })
@ObjectType()
export class TaxConcepts {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: '' })
  tax_concepts_id: string;

  @Column('float4')
  @Field(() => Float, { description: '' })
  base: number;

  @Column('float4')
  @Field(() => Float, { description: '' })
  amount: number;

  @Column('int')
  @Field(() => Int, { description: '' })
  tax: number;

  @Column('float4')
  @Field(() => Float, { description: '' })
  rate_or_quota: number;

  @Column('text')
  @Field(() => String, { description: '' })
  factor_type: string;

  @Column('text')
  @Field(() => String, { description: '' })
  item_type: string;

  // Relations
  @OneToMany(() => getConceptClass(), (concepts) => concepts.tax_concepts)
  concepts: ReturnType<typeof getConceptClass>;
}
