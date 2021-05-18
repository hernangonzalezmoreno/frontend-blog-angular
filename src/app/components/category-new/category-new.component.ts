import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [ UserService, CategoryService ]
})
export class CategoryNewComponent implements OnInit {

  public pageTitle: string = 'Crear una nueva categoría';
  public identity;
  public token;
  public category: Category;
  public status: string = '';

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
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
    //console.log( form );
    //console.log( this.category );
    this._categoryService.create( this.token, this.category ).subscribe(
      response => {
        if( response.status == 'success' ){
          this.status = response.status;
          this.category = response.category;
          // this._router.navigate(['inicio']); // si quiero puedo redireccionar
        }else this.status = 'error';
      },
      error => {
        this.status = 'error';
        console.log( <any>error );
      }
    );
  }

}
