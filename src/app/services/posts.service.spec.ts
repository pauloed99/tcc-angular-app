import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import Post from '../models/post';

const expectedUrl = 'http://localhost:3000/posts/';

describe('PostsService', () => {
  let service: PostsService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });
    service = TestBed.inject(PostsService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return all posts', () => {
    let actualPosts: Post[] = [];

    const postsMock: Post[] = [
      { id: 1, title: 'typescript', author: 'Paulo' },
      { id: 2, title: 'typescript', author: 'Marilia' },
    ];

    service.getPosts().subscribe((posts) => {
      actualPosts = posts;
    });

    const request = controller.expectOne(expectedUrl);

    request.flush(postsMock);
    controller.verify();

    expect(actualPosts).toEqual(postsMock);
  });

  it('should be save a post', () => {
    let actualPost: Post = <Post>{};

    const postMock: Post = { id: 1, title: 'typescript', author: 'Paulo' };

    service.addPost(postMock).subscribe((post) => {
      actualPost = post;
    });

    const request = controller.expectOne(expectedUrl);

    request.flush(postMock);
    controller.verify();

    expect(actualPost).toEqual(postMock);
  });

  it('should be update a post', () => {
    const postMock: Post = { id: 1, title: 'typescript', author: 'Paulo' };

    service.updatePost(postMock, postMock.id).subscribe();

    const request = controller.expectOne(expectedUrl + postMock.id);

    controller.verify();

    expect(request.request.method).toEqual('PUT');
  });

  it('should be delete a post', () => {
    const postMock: Post = { id: 1, title: 'typescript', author: 'Paulo' };

    service.deletePost(postMock.id).subscribe();

    const request = controller.expectOne(expectedUrl + postMock.id);

    controller.verify();

    expect(request.request.method).toEqual('DELETE');
  });
});
