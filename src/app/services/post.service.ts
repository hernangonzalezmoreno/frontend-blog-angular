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

  getHeaders( token: string = '' ): HttpHeaders{
    let headers = new HttpHeaders().set( 'Content-Type', 'application/x-www-form-urlencoded' );
    if( token !== '' ) headers.set( 'Authorization', token );
    return headers;
  }

  getPosts(): Observable<any>{
    return this._http.get( global.urlPost, {headers: this.getHeaders()} );
  }

  getPost( id: number ): Observable<any>{
    return this._http.get( global.urlPost+'/'+id, {headers: this.getHeaders()} );
  }

  create( token: string, post: Post ): Observable<any>{
    let json = JSON.stringify( post );
    let params = 'json='+json;

    let headers = this.getHeaders( token );

    return this._http.post( global.url+'post', params, {headers: headers} );
  }

  update( token: string, post: Post ): Observable<any>{
    let json = JSON.stringify( post );
    let params = 'json='+json;

    let headers = this.getHeaders( token );

    return this._http.put( global.urlPost +'/'+ post.id, params, {headers: headers}  );
  }

}
