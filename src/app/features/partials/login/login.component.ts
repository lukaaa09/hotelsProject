import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private _dialogRef: MatDialogRef<any>,
              private _dialog: MatDialog,
              private _authService: AuthService) {
  }

  ngOnInit() {
  }
  async onSignIp(email: string, password: string) {
    await this._authService.signIn(email, password)
    if (this._authService.isLoggedIn) {
      this._dialogRef.close()
    }
  }

  openRegisterDialog() {
    this._dialogRef.close()

    this._dialog.open(RegisterComponent)
  }
}
