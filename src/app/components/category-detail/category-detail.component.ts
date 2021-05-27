import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { Category } from '../../models/category';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-category-detail',
  templateUrl: '../home/home.component.html',
  styleUrls: ['../home/home.component.css'],
  providers: [ UserService, PostService, CategoryService ]
})
export class CategoryDetailComponent implements OnInit {

  public pageTitle: string = '';
  public identity: any;
  public token: string;
  public category: Category = new Category();
  public posts: Array<Post> = [];
  public global;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _postService: PostService,
    private _categoryService: CategoryService,
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.global = global;
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(){
    this._activatedRoute.params.subscribe(
      params => {
        let category_id = +params['id'];
        this.getCategory( category_id );
        this.getPosts( category_id );
      }
    );
  }

  getCategory( category_id: number ){
    this._categoryService.getCategory( category_id ).subscribe(
      response => {
        if( response.status == 'success' ){
          this.category = response.category;
          this.pageTitle = response.category.name;
        }else console.log( 'Error getCategory() (1)' );
      },
      error => {
        console.log( 'Error getCategory() (2) ' + <any>error );
      }
    );
  }

  getPosts( category_id: number ){
    this._postService.getPostsByCategory( category_id ).subscribe(
      response => {
        if( response.status == 'success' ){
          this.posts = response.posts;
          console.log( this.posts );
        }else console.log( 'Error al pedir los posts por categoria (1)' );
      },
      error => {
        console.log( 'Error al pedir los posts por categoria (2): ' + <any>error );
      }
    );
  }

  deletePost( id: number ){
    this._postService.delete( this.token, id ).subscribe(
      response => {
        this.getPosts( this.category.id );
      },
      error => {
        console.log( <any>error );
      }
    );
  }

}
