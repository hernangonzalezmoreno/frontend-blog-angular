import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [ PostService ]
})
export class CategoryDetailComponent implements OnInit {

  public posts: Array<Post> = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _postService: PostService,
  ){

  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(){
    this._activatedRoute.params.subscribe(
      params => {
        let category_id = +params['id'];

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
    );
  }

}
