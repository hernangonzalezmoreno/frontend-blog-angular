import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ PostService ]
})
export class HomeComponent implements OnInit {

  public pageTitle: string = 'Inicio';
  public posts: Array<Post> = [];

  constructor(
    private _postService: PostService
  ){

  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this._postService.getPosts().subscribe(
      response => {
        if( response.status == 'success' ){
          this.posts = response.posts;
          console.log( this.posts );
        }
      },
      error => {
        console.log( 'Home Error: getPosts() (1) -> ' + <any>error );
      }
    );
  }

}
