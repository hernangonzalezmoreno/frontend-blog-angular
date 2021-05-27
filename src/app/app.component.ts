import { Component, OnInit, DoCheck } from '@angular/core';
import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService, CategoryService ]
})
export class AppComponent implements OnInit, DoCheck{

  public title = 'frontend-blog-angular';
  public identity: any;
  public urlAvatar: string;
  public token: string = '';
  public categories: any;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService
  ){
    this.loadUser();
    this.urlAvatar = global.urlAvatar;
  }

  ngOnInit(){
    this.getCategories();
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if( response.status == 'success' ){
          this.categories = response.categories;
          //console.log( this.categories );
        }else console.log( 'Error al cargar las categorias (1).' );
      },
      error => {
        console.log( 'Error al cargar las categorias (2).' );
      }
    );
  }

}
