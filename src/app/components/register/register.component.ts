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

  constructor(
    private _userService: UserService
  ){
    this.pageTitle = "Registrarse";
    this.user = new User(1,'','','ROLE_USER','','','','');
  }

  ngOnInit(): void {
  }

  onSubmit( formulario: any ){
    console.log( this.user );
    formulario.reset();
  }

}
