import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Post from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() post = <Post>{};
  @Output() newPostsEvent = new EventEmitter<Post[]>();

  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private toastService: ToastrService
  ) {}

  editForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
  });

  ngOnInit(): void {
    this.editForm.patchValue(this.post);
  }

  get title() {
    return this.editForm.get('title');
  }
  get author() {
    return this.editForm.get('author');
  }

  getPosts() {
    this.postsService.getPosts().subscribe({
      next: (posts) => this.newPostsEvent.emit(posts),
      error: () =>
        this.toastService.error('Erro ao carregar os posts!', 'Post Status'),
    });
  }

  editPost() {
    if (this.editForm.valid) {
      let postToBeUpdated: Post = {
        ...(this.editForm.value as Post),
        id: this.post.id,
      };

      this.postsService.updatePost(postToBeUpdated, this.post.id).subscribe({
        next: () => {
          this.toastService.success(
            'Post atualizado com sucesso!',
            'Post Status'
          );
          this.getPosts();
        },
        error: () =>
          this.toastService.error('Erro ao atualizar o post!', 'Post Status'),
      });
    } else {
      Object.keys(this.editForm.controls).forEach((control) => {
        this.editForm.get(control)?.markAsDirty();
      });
    }
  }

  deletePost() {
    this.postsService.deletePost(this.post.id).subscribe({
      next: () => {
        this.toastService.success('Post excluído com sucesso!', 'Post Status');
        this.getPosts();
      },
      error: () =>
        this.toastService.error('Erro ao atualizar o post!', 'Post Status'),
    });
  }
}
