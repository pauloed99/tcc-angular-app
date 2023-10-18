import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Post from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseUrl = 'http://localhost:3000/posts/';

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(this.baseUrl);
  }

  addPost(post: Post) {
    return this.http.post<Post>(this.baseUrl, post);
  }

  deletePost(id: number) {
    return this.http.delete<void>(this.baseUrl + id);
  }

  updatePost(post: Post, id: number) {
    return this.http.put<void>(this.baseUrl + id, post, {
      headers: this.headers,
    });
  }
}
