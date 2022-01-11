import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async () => ({
        node: 'http://localhost:9200',
      }),
    }),
  ],
  exports: [ElasticsearchModule],
})
export class SearchModule {}
