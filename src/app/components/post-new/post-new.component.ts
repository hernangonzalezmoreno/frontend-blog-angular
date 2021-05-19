import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [ CategoryService, UserService ]
})
export class PostNewComponent implements OnInit {

  public pageTitle: string = 'Crear nueva entrada';
  public identity: any;
  public token: string;
  public post: Post;
  public categories: any;
  public urlPostGetImage: string;

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
    private _activateRoute: ActivatedRoute,
    private _categoryService: CategoryService,
    private _userService: UserService
  )
  {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.post = new Post( 1, this.identity.sub );
    console.log( this.post );
    this.urlPostGetImage = global.urlPostGetImage;
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

  ngOnInit(): void {
    this.getCategories();
  }

  imageUpload( data: any ){
    //console.log( data );
    this.post.image = data.body.image;
  }

  onSubmit( form: any ){
    console.log( this.post );
  }

}
