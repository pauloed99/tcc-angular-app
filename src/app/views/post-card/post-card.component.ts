import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Post from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() post = {} as Post;

  @Output() newPosts = new EventEmitter<Post[]>();

  editForm = this.formBuilder.group({
    title: [''],
    author: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.editForm.patchValue(this.post);
  }

  editPost() {
    this.postsService
      .updatePost(this.editForm.value, this.post.id)
      .subscribe(() =>
        this.postsService
          .getPosts()
          .subscribe((posts) => this.newPosts.emit(posts))
      );
  }

  deletePost() {
    this.postsService
      .deletePost(this.post.id)
      .subscribe(() =>
        this.postsService
          .getPosts()
          .subscribe((posts) => this.newPosts.emit(posts))
      );
  }
}
