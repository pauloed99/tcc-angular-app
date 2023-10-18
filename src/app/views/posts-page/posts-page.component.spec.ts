import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPageComponent } from './posts-page.component';
import { PostsService } from 'src/app/services/posts.service';
import Post from 'src/app/models/post';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const postsMock: Post[] = [
  { id: 1, title: 'angular', author: 'Paulo' },
  { id: 2, title: 'typescript', author: 'Bianca' },
];

describe('PostsPageComponent', () => {
  let component: PostsPageComponent;
  let fixture: ComponentFixture<PostsPageComponent>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  let toastServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    postsServiceSpy = jasmine.createSpyObj<PostsService>(['getPosts']);
    toastServiceSpy = jasmine.createSpyObj<ToastrService>(['error']);

    await TestBed.configureTestingModule({
      declarations: [PostsPageComponent],
      providers: [
        { provide: PostsService, useValue: postsServiceSpy },
        { provide: ToastrService, useValue: toastServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsPageComponent);
    component = fixture.componentInstance;
    postsServiceSpy.getPosts.and.returnValue(of(postsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be not load posts when load the page', () => {
    postsServiceSpy.getPosts.and.returnValue(throwError(() => new Error()));
    toastServiceSpy.error.and.stub();

    component.ngOnInit();

    expect(toastServiceSpy.error).toHaveBeenCalled();
  });

  it('should be load new posts', () => {
    component.getNewPosts(postsMock);

    expect(component.posts.length).toEqual(postsMock.length);
  });
});
