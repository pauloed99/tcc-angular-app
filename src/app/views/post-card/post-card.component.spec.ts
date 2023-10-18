import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardComponent } from './post-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import Post from 'src/app/models/post';
import { of, throwError } from 'rxjs';

const postMock: Post = { id: 1, title: 'angular', author: 'Paulo' };

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  let toastServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    postsServiceSpy = jasmine.createSpyObj<PostsService>([
      'getPosts',
      'updatePost',
      'deletePost',
    ]);
    toastServiceSpy = jasmine.createSpyObj<ToastrService>(['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [PostCardComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: PostsService, useValue: postsServiceSpy },
        { provide: ToastrService, useValue: toastServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be edit a post', () => {
    component.editForm.setValue({
      title: postMock.title,
      author: postMock.author,
    });

    postsServiceSpy.updatePost.and.returnValue(of(undefined));
    toastServiceSpy.success.and.stub();
    postsServiceSpy.getPosts.and.returnValue(of([postMock]));

    component.editPost();

    expect(toastServiceSpy.success).toHaveBeenCalled();
  });

  it('should be throw a error when try edit a post', () => {
    component.editForm.setValue({
      title: postMock.title,
      author: postMock.author,
    });

    postsServiceSpy.updatePost.and.returnValue(throwError(() => new Error()));
    toastServiceSpy.error.and.stub();

    component.editPost();

    expect(toastServiceSpy.error).toHaveBeenCalled();
  });

  it('should be mark any input as dirty', () => {
    component.editPost();

    expect(component.editForm.controls.title.dirty).toEqual(true);
  });

  it('should be delete a post', () => {
    postsServiceSpy.deletePost.and.returnValue(of(undefined));
    postsServiceSpy.getPosts.and.returnValue(of([]));
    toastServiceSpy.success.and.stub();

    component.deletePost();

    expect(toastServiceSpy.success).toHaveBeenCalled();
  });

  it('should be throw a error when try delete a post', () => {
    postsServiceSpy.deletePost.and.returnValue(throwError(() => new Error()));
    toastServiceSpy.error.and.stub();

    component.deletePost();

    expect(toastServiceSpy.error).toHaveBeenCalled();
  });

  it('should be throw an error when get all posts', () => {
    postsServiceSpy.getPosts.and.returnValue(throwError(() => new Error()));
    toastServiceSpy.error.and.stub();

    component.getPosts();

    expect(toastServiceSpy.error).toHaveBeenCalled();
  });
});
