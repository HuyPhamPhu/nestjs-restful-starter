import { Test, TestingModule } from "@nestjs/testing";
import { PostDto } from "./dto/post.dto";
import { Post } from "./post.entity";
import { PostsController } from "./posts.controller";
import { postsProviders } from "./posts.providers";
import { PostsService } from "./posts.service";

describe('PostsController', () => {
    let postsController: PostsController;
    let spyService: PostsService;
    let post: Post;

    beforeEach(async () => {
      const ApiServiceProvider = {
        provide: PostsService,
        useFactory: () => ({
          findAll: jest.fn().mockReturnValue([]),
          findOne: jest.fn().mockReturnValue({ }),
          create: jest.fn().mockReturnValue({ }),
          update: jest.fn().mockReturnValue({ }),
          delete: jest.fn().mockReturnValue({ }), 
          getUserPost: jest.fn().mockReturnValue({ }), 
        }),
      };
      const app: TestingModule = await Test.createTestingModule({
        controllers: [PostsController],
        providers: [PostsService, ApiServiceProvider],
      }).compile();
      spyService = app.get<PostsService>(PostsService);
      postsController = app.get<PostsController>(PostsController);
      
    });

    describe('findAll', () => {
      it('findAll should been called', async () => {

        postsController.findAll();
        expect(spyService.findAll).toHaveBeenCalled();
      });
    });

    describe('findAll', () => {
      it('findAll should return all posts', async () => {
        const result:any[] = ['test'];
        jest.spyOn(spyService, 'findAll').mockResolvedValueOnce(result)

        expect(await postsController.findAll()).toBe(result);
      });
    });

    describe('findOne', () => {
      it('findOne should been called', async () => {
        const id = 1;
        postsController.findOne(id);
        expect(spyService.findOne).toHaveBeenCalled();
      });
    });

    describe('findOne', () => {
      it('findOne should return all posts', async () => {
        const id = 1;
        const result : PostDto = {
          id: 0,
          authorId: "",
          authorFirstName: "",
          authorLastName: "",
          title: "",
          content: "",
          createdAt: undefined,
          updatedAt: undefined
        };
        jest.spyOn(spyService, 'findOne').mockResolvedValueOnce(result)

        expect(await postsController.findOne(id)).toBe(result);
      });
    });

    describe('create', () => {
      it('create should been called', async () => {
        const req = {user:{id: "1"}};
        const arg : PostDto = {
          id: 0,
          authorId: "",
          authorFirstName: "",
          authorLastName: "",
          title: "",
          content: "",
          createdAt: undefined,
          updatedAt: undefined
        };
        postsController.create(arg,req);
        expect(spyService.create).toHaveBeenCalled();
      });
    });

    describe('create', () => {
      it('create should create post', async () => {
        
        const result:any = {};
        const req = {user:{id: "1"}};
        const arg : PostDto = {
          id: 0,
          authorId: "",
          authorFirstName: "",
          authorLastName: "",
          title: "",
          content: "",
          createdAt: undefined,
          updatedAt: undefined
        };
        jest.spyOn(spyService, 'create').mockResolvedValueOnce(result)

        expect(await postsController.create(arg,req)).toBe(result);
      });
    });

    describe('update', () => {
      it('update should been called', async () => {
        const id = 1;
        const req = {user:{id: "1"}};
        const arg : PostDto = {
          id: 0,
          authorId: "",
          authorFirstName: "",
          authorLastName: "",
          title: "",
          content: "",
          createdAt: undefined,
          updatedAt: undefined
        };
        postsController.update(id,req,arg);
        expect(spyService.update).toHaveBeenCalled();
      });
    });

    describe('update', () => {
      it('update should update post', async () => {
        const id = 1;
        const req = {user:{id: "1"}};
        const arg : PostDto = {
          id: 0,
          authorId: "",
          authorFirstName: "",
          authorLastName: "",
          title: "",
          content: "",
          createdAt: undefined,
          updatedAt: undefined
        };
        const result:any = {};
        jest.spyOn(spyService, 'update').mockResolvedValueOnce(result)

        expect(await postsController.update(id,req,arg)).toBe(result);
      });
    });

    describe('delete', () => {
      it('delete should been called', async () => {
        const id = 1;
        const req = {user:{id: "1"}};
        postsController.delete(id,req);
        expect(spyService.delete).toHaveBeenCalled();
      });
    });

    describe('delete', () => {
      it('delete should delete post', async () => {
        const id = 1;
        const req = {user:{id: "1"}};
        const result:any = {};
        jest.spyOn(spyService, 'delete').mockResolvedValueOnce(result)

        expect(await postsController.delete(id,req)).toBe(result);
      });
    });
  });
  