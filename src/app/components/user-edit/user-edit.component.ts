import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public pageTitle: string = 'Ajustes';
  public user: User;

  constructor() {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  onSubmit( form: any ){

  }

}
