import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  isSignedIn = false

  constructor(private dialogRef: MatDialogRef<any>,
              private dialog: MatDialog,
              private _authService: AuthService) {
  }

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true
    }else {
      this.isSignedIn = false
    }
  }

  async onSignUp(email: string, password: string) {
    await this._authService.signUp(email, password)
    if (this._authService.isLoggedIn) {
      this.dialogRef.close()
      this.dialog.open(LoginComponent, {
      })
    }
  }

  openLoginDialog() {
    this.dialogRef.close()

     this.dialog.open(LoginComponent, {

    })
  }
}
