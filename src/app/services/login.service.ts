import { Injectable } from '@angular/core';
import { AppAPI } from './app-api';
import { HttpClient,HttpHeaders,HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  appApi= new AppAPI();
  httpOptions={};

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    };
  }

  login(body){
    return this.http.post<any>(this.appApi.loginAPI, body,this.httpOptions)
  }

  logout(){
    return this.http.get<any>(this.appApi.logoutAPI,this.httpOptions)
  }
  

}
