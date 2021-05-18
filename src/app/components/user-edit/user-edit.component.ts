import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [ UserService ]
})
export class UserEditComponent implements OnInit {

  public pageTitle: string = 'Ajustes';
  public user: User = new User();
  public token: string;
  public status: string = '';

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
        url: global.url + 'user/upload',
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
        attachPinBtn: 'Sube tu avatar de usuario',
      },
  };

  constructor(
    private _userService: UserService
  ){
    this.user.setValues( this._userService.getIdentity() );
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
  }

  avatarUpload( datos: any ){
    //console.log( datos.body );
    this.user.image = datos.body.image;
  }

  onSubmit( form: any ){
    this._userService.update( this.token, this.user ).subscribe(
      response => {

        if( !response || !response.status ){ this.status = 'error'; return; }

        console.log( <any> response );
        this.user.setValues( response.changes );
        localStorage.setItem( 'identity', JSON.stringify(this.user) );
        this.status = 'success';

      },
      error => {
        console.log( <any> error );
        this.status = 'error';
      }
    );
  }

}
