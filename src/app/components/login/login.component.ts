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

  constructor(
    private _userService: UserService
  ){
    this.pageTitle = 'Login';
    this.user = new User(1,'','','ROLE_USER','','','','');
  }

  ngOnInit(): void {
  }

  onSubmit( form: any ){

  }

}
