import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false

  constructor(private _firebaseAuth: AngularFireAuth) {
    if(localStorage.getItem('user')) {
      this.isLoggedIn = true
    }
  }

  async signIn(email: string, password: string) {
    await this._firebaseAuth.signInWithEmailAndPassword(email, password).then( res => {
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  async signUp(email: string, password: string) {
    await this._firebaseAuth.createUserWithEmailAndPassword(email, password).then( res => {
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  logOut() {
    this._firebaseAuth.signOut()
    this.isLoggedIn = false
    localStorage.removeItem('user')
  }
}
