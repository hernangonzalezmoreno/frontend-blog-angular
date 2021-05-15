import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent {

  public title = 'frontend-blog-angular';
  public identity: User;

  constructor(
    public _userService: UserService
  ){
    this.identity = this._userService.getIdentity();
  }

}
