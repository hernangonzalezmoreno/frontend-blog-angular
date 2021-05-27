import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { User } from '../../models/user';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ UserService, PostService ]
})
export class ProfileComponent implements OnInit {

  public pageTitle: string = '';
  public identity: any;
  public token: string = '';
  public profile: User = new User();
  public posts: Array<Post> = [];
  public global: any;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _postService: PostService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.global = global;
  }

  ngOnInit(): void {
    this.getParams();
  }

  error( msj: string = '' ){
    if( msj !== '' ) console.log( msj );
    this._router.navigate( ['/error'] );
  }

  getParams(){
    this._activatedRoute.params.subscribe(
      params => {
        this.profile.id = +params['id'];
        this.getProfile();
        this.getPosts();
      }
    );
  }

  getProfile(){
    this._userService.detail( this.profile.id ).subscribe(
      response => {
        if( response.status == 'success' ){
          this.profile.setValues( response.user );
        }else this.error( "Error getProfile() (1)" );
      },
      error => {
        this.error( "Error getProfile() (2): " + <any>error );
      }
    );
  }

  getPosts(){
    this._postService.getPostsByUser( this.profile.id ).subscribe(
      response => {
        if( response.status == 'success' ){
          this.posts = response.posts;
        }else this.error( 'Error getPostsByUser() (1)' );
      },
      error => {
        this.error( 'Error getPostsByUser() (2): ' + <any>error );
      }
    );
  }

  deletePost( id: number ){
    this._postService.delete( this.token, id ).subscribe(
      response => {
        if( response.status == 'success' ){
          this.getPosts();
        }else console.log( 'Error profile deletePost() (1)' );
      },
      error => {
         console.log( 'Error profile deletePost() (2): '+<any>error );
      }
    );
  }

}
