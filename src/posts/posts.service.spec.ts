import { Test, TestingModule } from "@nestjs/testing";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostsService } from "./posts.service";

class ApiServiceMock {
    create(userId: string, createPostDto: CreatePostDto) {
       return {};
    }
    findAll() {
      return [];
    }
    findOne(id: number) {
      return {};
    }
    update(id: number, userId: string, updatePostDto: UpdatePostDto) {
        return {};
    }
    delete(id: number, userId: string) {
        return {};
     }
  }
  describe.only("PostsService", () => {
  
    let postsService: PostsService;
  
    beforeAll(async () => {
      const ApiServiceProvider = {
        provide: PostsService,
        useClass: ApiServiceMock,
      }
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            PostsService, ApiServiceProvider
        ],
      }).compile();
      postsService = module.get<PostsService>(PostsService);
    })

    it('should call create method with expected params', async () => {
        const createPostsSpy = jest.spyOn(postsService, 'create');
        const userId = '1';
        const dto = new CreatePostDto();
        postsService.create(userId,dto);
        expect(createPostsSpy).toHaveBeenCalledWith(userId,dto);
      });

    it('should call findAll method', async () => {
        const findAllSpy = jest.spyOn(postsService, 'findAll');
        postsService.findAll();
        expect(findAllSpy).toHaveBeenCalledWith();
      });
    
    it('should call findOne method with expected params', async () => {
        const findOneSpy = jest.spyOn(postsService, 'findOne');
        const id = 1;
        postsService.findOne(id);
        expect(findOneSpy).toHaveBeenCalledWith(id);
      });
    it('should call update method with expected params', async () => {
        const updateSpy = jest.spyOn(postsService, 'update');
        const id = 1;
        const userId = '1';
        const dto = new CreatePostDto();
        postsService.update(id,userId,dto);
        expect(updateSpy).toHaveBeenCalledWith(id,userId,dto);
      });
    
      it('should call delete method with expected params', async () => {
        const deleteSpy = jest.spyOn(postsService, 'delete');
        const id = 1;
        const userId = '1';
        postsService.delete(id,userId);
        expect(deleteSpy).toHaveBeenCalledWith(id,userId);
      });
})
