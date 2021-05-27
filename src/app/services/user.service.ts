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

  getToken(): string{
    let token = localStorage.getItem( 'token' );
    return !token? '' : token;
  }

  getIdentity(): User{
    let identity = JSON.parse( localStorage.getItem( 'identity' ) || 'null' ) as User;
    return identity;
  }

  detail( id: number ): Observable<any>{
    return this._http.get( this.url + 'user/detail/' + id, {headers: this.getHeaders()} );
  }

  register( user: User ): Observable<any>{
    let json = JSON.stringify( user );
    let params = 'json=' + json;

    return this._http.post( this.url+'register', params, {headers: this.getHeaders()} );
  }

  singup( user: User, getToken: boolean = false ): Observable<any>{

    // Convierto el objeto user en un string con formato JSON
    let userJsonString = JSON.stringify( user );
    // Convierto el string a un objeto JSON, de esta forma puedo agregar nuevas propiedades
    let userJson = JSON.parse( userJsonString );

    // Agrego nuevo campo al JSON si hace falta
    if( getToken ) userJson.getDecodedToken = "true";

    // Convierto en string con formato JSON al objeto JSON
    let json = JSON.stringify( userJson );
    let params = 'json='+json;

    return this._http.post( this.url+'login', params, {headers: this.getHeaders()} );

  }

  update( token: string, user: User ): Observable<any>{
    let json = JSON.stringify( user );
    let params = 'json='+json;

    let headers = this.getHeaders().set( 'Authorization', token );

    return this._http.put( this.url + 'user/update', params, {headers: headers} );
  }

}
