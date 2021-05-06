import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public pageTitle : string;
  public user : User;

  constructor(){
    this.pageTitle = "Registrarse";
    this.user = new User(1,'','','ROLE_USER','','','','');
  }

  ngOnInit(): void {
  }

  onSubmit( form: any ){
    console.log( this.user );
  }

}
