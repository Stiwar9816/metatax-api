import { CreateBulkDownloadInput } from './create-bulk-download.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBulkDownloadInput extends PartialType(
  CreateBulkDownloadInput,
) {
  @Field(() => Int)
  id: number;
}
