import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { TaskSearchResult } from './types/taskSearchResult.interface';
import { TaskSearchBody } from './types/taskSearchBody.interface';
import { Task } from './task.entity';

@Injectable()
export default class TasksSearchService {
  index = 'tasks';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexTask(task: Task) {
    return this.elasticsearchService.index<TaskSearchResult, TaskSearchBody>({
      index: this.index,
      body: {
        id: task.id,
        name: task.name,
        description: task.description,
        isDone: task.isDone,
        authorId: task.userId,
      },
    });
  }

  async search(text: string) {
    const { body } = await this.elasticsearchService.search<TaskSearchResult>({
      index: this.index,
      body: {
        query: {
          match_phrase: {
            name: text,
          },
        },
      },
    });
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }

  async remove(taskId: number) {
    this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: taskId,
          },
        },
      },
    });
  }

  async update(task: Task) {
    const newBody: any = {
      id: task.id,
      name: task.name,
      description: task.description,
      authorId: task.userId,
    };

    const script = Object.entries(newBody).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    return this.elasticsearchService.updateByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: task.id,
          },
        },
        script: {
          inline: script,
        },
      },
    });
  }
}
