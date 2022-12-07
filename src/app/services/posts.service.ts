import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AddPost from '../models/add.post';
import Post from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  baseUrl = 'http://localhost:3000/posts/';

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>(this.baseUrl);
  }

  addPosts(post: AddPost) {
    return this.http.post<void>(this.baseUrl, post);
  };

  deletePost(id: number) {
    return this.http.delete<void>(this.baseUrl + id);
  }

  updatePost(post: AddPost, id: number) {
    return this.http.put<void>(this.baseUrl + id, post, {headers: this.headers});
  }
}
