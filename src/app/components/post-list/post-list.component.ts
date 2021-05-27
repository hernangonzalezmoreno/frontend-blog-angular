import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [ PostService ]
})
export class PostListComponent implements OnInit {

  @Input() parent: any;
  @Input() identity: any;
  @Input() posts: any;
  @Input() global: any;

  constructor(
      private _postService: PostService
  ){}

  ngOnInit(): void {
    //console.log( "Mi componente padre tiene el titulo de: " + this.parent.pageTitle );
  }

}
