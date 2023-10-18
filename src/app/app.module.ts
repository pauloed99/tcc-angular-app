import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsPageComponent } from './views/posts-page/posts-page.component';
import { PostCardComponent } from './views/post-card/post-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostModalComponent } from './views/post-modal/post-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsPageComponent,
    PostCardComponent,
    PostModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ progressBar: true, timeOut: 2500 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
