import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../partials/register/register.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(public _dialog: MatDialog, private _authService: AuthService) {
  }

  ngOnInit() {
  }



  public openRegisterDialog() {
    const dialogRef = this._dialog.open(RegisterComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => {});
  }

  logOut() {
  }
}
