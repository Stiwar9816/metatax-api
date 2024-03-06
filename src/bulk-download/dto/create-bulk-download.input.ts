import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBulkDownloadInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
