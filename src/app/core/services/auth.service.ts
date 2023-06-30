import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from '../models/register.user';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginUser } from '../models/login.user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'
  isLoggedIn = false


  constructor(private _http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true
    }
  }

  RegisterUser(user: RegisterUser): Observable<RegisterUser> {
   return  this._http.post<RegisterUser>(`${this.baseUrl}/register`, user)
  }

  loginUser(user: LoginUser): Observable<LoginUser> {
    return this._http.post<LoginUser>(`${this.baseUrl}/login`, user)
  }

  logOutUser() {
    localStorage.clear()
    this.isLoggedIn = false
  }
}

