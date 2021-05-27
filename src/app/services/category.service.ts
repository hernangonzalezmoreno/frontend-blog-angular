import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { global } from './global';

@Injectable()
export class CategoryService{

  private _url : string;

  constructor(
    private _http: HttpClient
  ){
    this._url = global.url;
  }

  getHeaders(): HttpHeaders{
    return new HttpHeaders().set( 'Content-Type', 'application/x-www-form-urlencoded' );
  }

  create( token: string, category: Category ): Observable<any>{
    let json = JSON.stringify( category );
    let params = 'json='+json;

    let headers = this.getHeaders().set( 'Authorization', token );

    return this._http.post( this._url+'category', params, {headers: headers} );
  }

  getCategories(): Observable<any>{
    let headers = this.getHeaders();
    return this._http.get( this._url+'category', {headers: headers } );
  }

  getCategory( category_id: number ): Observable<any>{
    let headers = this.getHeaders();
    return this._http.get( this._url+'category/'+category_id, {headers: headers } );
  }

}
