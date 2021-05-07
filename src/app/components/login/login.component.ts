import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string = '';

  constructor(
    private _userService: UserService
  ){
    this.pageTitle = 'Login';
    this.user = new User(1,'','','ROLE_USER','','','','');
  }

  ngOnInit(): void {
  }

  // Este metodo puede ser usado para pedir el token o la identidad
  private getToken( getDecodedToken: string = '' ){

    this._userService.singup( this.user, getDecodedToken ).subscribe(
      response => {
        this.status = response.status;
        if( getDecodedToken == '' ){
          let token = response.token;
          console.log( 'TOKEN = ' + token );
          // Guardamos el token en el localStorage
          localStorage.setItem( 'token', token );
        }else{
          let identity = response.user;
          console.log( 'IDENTITY = ' + JSON.stringify( identity ) );
          // Guardamos el user en el localStorage
          localStorage.setItem( 'identity', JSON.stringify( identity ) );
        }
      },
      error => {
        this.status = error.status;
        console.log( error );
        console.log( "Error con la comunicación." );
      }
    );

  }

  getIdentity(){
    // Para obtener la identidad debemos pasarle algun string a getToken
    this.getToken( 'true' );
  }

  onSubmit( form: any ){
    // Si el formulario es rellenado correctamente, procedemos a perdir el token y la identidad
    this.getToken();
    this.getIdentity();
  }

}
