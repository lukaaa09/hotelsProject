import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../partials/register/register.component';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  searchText!: string

  constructor(public _dialog: MatDialog,
              private _authService: AuthService,
              private _toastr: ToastrService,
              private _searchService: SearchService) {
  }

  ngOnInit() {
  }

  get loggedIn() {
    return this._authService.isLoggedIn
  }

  public openRegisterDialog() {
    const dialogRef = this._dialog.open(RegisterComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => {});
  }

  logOut() {
    this._authService.logOutUser()
    this._toastr.info('successfully log out')
  }

  onSearch() {
    this._searchService.emitSearchChanged(this.searchText)
  }
}
