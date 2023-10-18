import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Post from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css'],
})
export class PostModalComponent {
  @Output() newPostsEvent = new EventEmitter<Post[]>();

  constructor(
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private toastService: ToastrService
  ) {}

  addForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
  });

  get title() {
    return this.addForm.get('title');
  }
  get author() {
    return this.addForm.get('author');
  }

  closeModal() {
    this.addForm.reset();
  }

  getPosts() {
    this.postsService.getPosts().subscribe({
      next: (posts) => this.newPostsEvent.emit(posts),
      error: () =>
        this.toastService.error('Erro ao carregar os posts!', 'Post Status'),
    });
  }

  addPost() {
    if (this.addForm.valid) {
      this.postsService.addPost(this.addForm.value as Post).subscribe({
        next: () => {
          this.closeModal();
          this.toastService.success(
            'Post adicionado com sucesso!',
            'Post Status'
          );
          this.getPosts();
        },
        error: () =>
          this.toastService.error('Erro ao adicionar o post!', 'Post Status'),
      });
    } else {
      Object.keys(this.addForm.controls).forEach((control) => {
        this.addForm.get(control)?.markAsDirty();
      });
    }
  }
}
