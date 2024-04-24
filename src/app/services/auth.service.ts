import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiUrl;
  tokenKey:string = 'token';

  constructor(private http:HttpClient) { }

    login(data:LoginRequest):Observable<LoginResponse>{
      return this.http.post<LoginResponse>(`${this.apiUrl}Users/Login`,data).pipe(
        map((response) => {
          if (response.isSuccess){
            localStorage.setItem(this.tokenKey,response.tokenKey)
          }
          return response;
        })
      );
  }
  
}
