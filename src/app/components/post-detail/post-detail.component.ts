import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [ PostService ]
})
export class PostDetailComponent implements OnInit {

  public pageTitle: string = '';
  public post: any;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _postService: PostService
  ){

  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    this._activatedRoute.params.subscribe(
      params => {
        let id = +params['id'];

        this._postService.getPost( id ).subscribe(
          response => {
            if( response.status == 'success' ){
              this.post = response.post;
              console.log( this.post );
            }else this._router.navigate(['/inicio']);
          },
          error => {
            console.log( "Post-detail Error: " +<any>error+" (1)" );
            this._router.navigate(['/inicio']);
          }
        );

      }
    );
  }

}
