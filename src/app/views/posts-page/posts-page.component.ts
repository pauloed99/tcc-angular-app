import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe({
      next: (posts) => (this.posts = posts),
      error: () =>
        this.toastService.error('Erro ao carregar os posts!', 'Post Status'),
    });
  }

  getNewPosts(newPosts: Post[]) {
    this.posts = newPosts;
  }
}
