import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = " https://lamansysfaketaskmanagerapi.onrender.com/api";

  constructor(private http: HttpClient) { }

  postLogin(user : any): Observable<any>{
    return this.http.post(this.baseUrl+'/login', user);
  }

}

export interface User{
  username: string;
  password: string;
}
