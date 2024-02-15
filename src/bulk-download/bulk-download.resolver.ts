import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BulkDownloadService } from './bulk-download.service';
import { Cfdi } from './entities/cfdi.entity';
import { CreateBulkDownloadInput } from './dto/create-bulk-download.input';
import { UpdateBulkDownloadInput } from './dto/update-bulk-download.input';

@Resolver(() => Cfdi)
export class BulkDownloadResolver {
  constructor(private readonly bulkDownloadService: BulkDownloadService) {}

  @Mutation(() => Cfdi)
  // createBulkDownload(@Args('createBulkDownloadInput') createBulkDownloadInput: CreateBulkDownloadInput) {
  //   return this.bulkDownloadService.create(createBulkDownloadInput);
  // }

  @Query(() => [Cfdi], { name: 'bulkDownload' })
  findAll() {
    return this.bulkDownloadService.findAll();
  }

  // @Query(() => Cfdi, { name: 'bulkDownload' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.bulkDownloadService.findOne(id);
  // }

  // @Mutation(() => Cfdi)
  // updateBulkDownload(@Args('updateBulkDownloadInput') updateBulkDownloadInput: UpdateBulkDownloadInput) {
  //   return this.bulkDownloadService.update(updateBulkDownloadInput.id, updateBulkDownloadInput);
  // }

  // @Mutation(() => Cfdi)
  // removeBulkDownload(@Args('id', { type: () => Int }) id: number) {
  //   return this.bulkDownloadService.remove(id);
  // }
}
