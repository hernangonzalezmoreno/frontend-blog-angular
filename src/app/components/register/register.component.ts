import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public pageTitle : string;
  public user : User;
  public status : string = '';

  constructor(
    private _userService: UserService
  ){
    this.pageTitle = "Registrarse";
    this.user = new User(1,'','','ROLE_USER','','','','');
  }

  ngOnInit(): void {
  }

  onSubmit( formulario: any ){

    this._userService.register( this.user ).subscribe(
      response => {
        console.log( 'Ok, todo bien' );
        console.log( response );
        this.status = response.status;
        if( this.status == "success" ) formulario.reset();
      },
      error => {
        console.log( <any>error );
        console.log( 'Salto error' );
        this.status = 'error';
      }
    );

  }

}
