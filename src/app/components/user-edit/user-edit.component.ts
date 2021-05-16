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
  public user: User;

  constructor(
    private _userService: UserService
  ){
    this.user = this._userService.getIdentity();
  }

  ngOnInit(): void {
  }

  onSubmit( form: any ){

  }

}
