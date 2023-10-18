import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostModalComponent } from './post-modal.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import Post from 'src/app/models/post';
import { of, throwError } from 'rxjs';

const postMock: Post = {
  id: 1,
  title: 'angular',
  author: 'Paulo',
};

describe('PostModalComponent', () => {
  let component: PostModalComponent;
  let fixture: ComponentFixture<PostModalComponent>;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  let toastServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    postsServiceSpy = jasmine.createSpyObj<PostsService>([
      'getPosts',
      'addPost',
    ]);
    toastServiceSpy = jasmine.createSpyObj<ToastrService>(['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [PostModalComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: PostsService, useValue: postsServiceSpy },
        { provide: ToastrService, useValue: toastServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be add a post and call success toast', () => {
    component.addForm.setValue({
      title: postMock.title,
      author: postMock.author,
    });
    postsServiceSpy.addPost.and.returnValue(of(postMock));
    postsServiceSpy.getPosts.and.returnValue(of([postMock]));
    toastServiceSpy.success.and.stub();

    component.addPost();

    expect(toastServiceSpy.success).toHaveBeenCalled();
  });

  it('should be mark any input as dirty', () => {
    component.addPost();

    expect(component.addForm.controls.title.dirty).toEqual(true);
  });

  it('should be get a error when load posts', () => {
    postsServiceSpy.getPosts.and.returnValue(throwError(() => new Error()));
    toastServiceSpy.error.and.stub();

    component.getPosts();

    expect(toastServiceSpy.error).toHaveBeenCalled();
  });

  it('should be get a error when add post', () => {
    component.addForm.setValue({
      title: postMock.title,
      author: postMock.author,
    });

    postsServiceSpy.addPost.and.returnValue(throwError(() => new Error()));
    toastServiceSpy.error.and.stub();

    component.addPost();

    expect(toastServiceSpy.error).toHaveBeenCalled();
  });
});
