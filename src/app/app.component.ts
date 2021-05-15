import { Component, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent implements DoCheck{

  public title = 'frontend-blog-angular';
  public identity: User = null as any;
  public token: string = '';

  constructor(
    public _userService: UserService
  ){
    this.loadUser();
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
