import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

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

  constructor(
    private _userService: UserService
  ){
    this.user.setValues( this._userService.getIdentity() );
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
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
