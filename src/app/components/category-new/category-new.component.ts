import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [ UserService ]
})
export class CategoryNewComponent implements OnInit {

  public pageTitle: string = 'Crear una nueva categoría';
  public identity;
  public token;
  public category: Category;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  )
  {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category();
  }

  ngOnInit(): void {
  }

  onSubmit( form: any ){
    console.log( form );
    console.log( this.category );
  }

}
