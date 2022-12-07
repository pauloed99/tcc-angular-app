import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Post from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css'],
})
export class PostsPageComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private formBuilder: FormBuilder
  ) {}

  addForm = this.formBuilder.group({
    title: [''],
    author: [''],
  });

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  getNewPosts(newPosts: any) {
    this.posts = newPosts;
  }

  addPost() {
    this.postsService
      .addPosts(this.addForm.value)
      .subscribe(() =>
        this.postsService.getPosts().subscribe((posts) => (this.posts = posts))
      );
  }
}
