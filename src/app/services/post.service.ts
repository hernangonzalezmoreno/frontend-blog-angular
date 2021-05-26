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
    return new HttpHeaders().set( 'Content-Type', 'application/x-www-form-urlencoded' )
                            .set( 'Authorization', token );
  }

  getPosts(): Observable<any>{
    return this._http.get( global.urlPost, {headers: this.getHeaders()} );
  }

  getPost( id: number ): Observable<any>{
    return this._http.get( global.urlPost+'/'+id, {headers: this.getHeaders()} );
  }

  getPostsByCategory( category_id: number ): Observable<any>{
    return this._http.get( global.urlPost+'/category/'+category_id, {headers: this.getHeaders()} );
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

  delete( token: string, id: number ): Observable<any>{
    let headers = this.getHeaders( token );
    return this._http.delete( global.urlPost +'/'+ id, {headers: headers} );
  }

}
