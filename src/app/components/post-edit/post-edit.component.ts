import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['../post-new/post-new.component.css'],
  providers: [ CategoryService, UserService, PostService ]
})
export class PostEditComponent implements OnInit {

  public pageTitle: string = 'Editar entrada';
  public identity: any;
  public token: string;
  public post: Post;
  public categories: any;
  public urlPostGetImage: string;
  public status: string = '';
  //public resetVar: any;
  public is_edit: boolean;

  // Opciones de Froala. Las distintas herramientas que se muestran segun el tamano de la pantalla
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'], // pantalla XS
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'], // pantalla SM
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'], // pantalla MD
  };

  public afuConfig: any = {
      multiple: false,
      formatsAllowed: ".jpg,.jpeg,.png,.gif",
      maxSize: "2",
      uploadAPI:  {
        url: global.url + 'post/upload',
        method:"POST",
        headers: {
          "Authorization" : this._userService.getToken()
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        attachPinBtn: 'Sube una imagen para el post',
      },
  };

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _postService: PostService
  )
  {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.post = new Post( 1, this.identity.sub );
    console.log( this.post );
    this.urlPostGetImage = global.urlPostGetImage;
    this.is_edit = true;
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if( response.status == 'success' ){
          this.categories = response.categories;
        }else console.log( 'Error al obtener las categorias (2.1).' );
      },
      error => {
        console.log( <any>error );
      }
    );
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
            console.log( "Post-edit Error: " +<any>error+" (1)" );
            this._router.navigate(['/inicio']);
          }
        );

      }
    );
  }

  ngOnInit(): void {
    this.getCategories();
    this.getPost();
  }

  imageUpload( data: any ){
    //console.log( data );
    this.post.image = data.body.image;
  }

  onSubmit( formulario: any ){
    console.log( this.post );
    this._postService.update( this.token, this.post ).subscribe(
      response => {
        if( response.status == 'success' ){
          this.status = response.status;
          // Redirigimos al post-detail de la entrada editada
          this._router.navigate( [ '/entrada', this.post.id ] );
        }else{
          this.status = 'error';
          if( response.message ) console.log( response.message );
        }
      },
      error => {
        this.status = 'error';
        console.log( <any>error );
      }
    );
  }

}
