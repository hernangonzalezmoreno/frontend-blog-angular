import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ UserService, PostService ]
})
export class HomeComponent implements OnInit {

  public pageTitle: string = 'Inicio';
  public identity: any;
  public token: string;
  public posts: Array<Post> = [];
  public global: any;
  public chargingPosts: boolean = true;

  constructor(
    private _userService: UserService,
    private _postService: PostService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.global = global;
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this._postService.getPosts().subscribe(
      response => {
        if( response.status == 'success' ){
          this.posts = response.posts;
          this.chargingPosts = false;
          console.log( this.posts );
        }
      },
      error => {
        console.log( 'Home Error: getPosts() (1) -> ' + <any>error );
      }
    );
  }

  deletePost( id: number ){
    this._postService.delete( this.token, id ).subscribe(
      response => {
        this.getPosts();
      },
      error => {
        console.log( <any>error );
      }
    );
  }

}
