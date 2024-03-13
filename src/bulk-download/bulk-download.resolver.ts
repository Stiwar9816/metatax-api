import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { BulkDownloadService } from './bulk-download.service';
import { Cfdi } from './entities/cfdi.entity';

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
