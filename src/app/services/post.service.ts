import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { global } from './global';

@Injectable()
export class PostService{

  private _url : string;

  constructor(
    private _http: HttpClient
  ){
    this._url = global.url;
  }

  getHeaders(): HttpHeaders{
    return new HttpHeaders().set( 'Content-Type', 'application/x-www-form-urlencoded' );
  }

  create( token: string, post: Post ): Observable<any>{
    let json = JSON.stringify( post );
    let params = 'json='+json;

    let headers = this.getHeaders().set( 'Authorization', token );

    return this._http.post( global.url+'post', params, {headers: headers} );
  }

  getPosts(): Observable<any>{
    return this._http.get( global.urlPost, {headers: this.getHeaders()} );
  }

}
