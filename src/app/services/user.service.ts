import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService{

  private url : string;

  constructor(
    public _http: HttpClient
  ){
    this.url = global.url;
  }

  getHeaders(): HttpHeaders{
    return new HttpHeaders().set( 'Content-Type', 'application/x-www-form-urlencoded' );
  }

  register( user: User ): Observable<any>{
    let json = JSON.stringify( user );
    let params = 'json=' + json;

    return this._http.post( this.url+'register', params, {headers: this.getHeaders()} );
  }

  singup( user: User, getToken: string = '' ): Observable<any>{

    if( getToken != '' ){
      user.getDecodedToken = 'true';
    }

    let json = JSON.stringify( user );
    let params = 'json='+json;

    return this._http.post( this.url+'login', params, {headers: this.getHeaders()} );

  }

  getToken(): string{
    let token = localStorage.getItem( 'token' );
    return !token? '' : token;
  }

  getIdentity(): User{
    let identity = JSON.parse( localStorage.getItem( 'identity' ) || 'null' ) as User;
    return identity;
  }

}
