import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './features/mainlayout/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/pages/home/home.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogoptionsComponent } from './features/partials/dialogoptions/dialogoptions.component';
import {MatMenuModule} from '@angular/material/menu';
import { AddFormDialogComponent } from './features/partials/add-form-dialog/add-form-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { EditFormComponent } from './features/partials/edit-form/edit-form.component';
import { ErrorhandlerInterceptor } from './core/interceptors/errorhandler.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { DeleteComponent } from './features/partials/delete/delete.component';
import { RegisterComponent } from './features/partials/register/register.component';
import { LoginComponent } from './features/partials/login/login.component';
import {MatIconModule} from '@angular/material/icon';
import {AngularFireModule} from '@angular/fire/compat';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DialogoptionsComponent,
    AddFormDialogComponent,
    EditFormComponent,
    DeleteComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBZxC1UTYK8nR30rW_FFPru3b97eWvoLgA",
      authDomain: "crystal-cove-8361f.firebaseapp.com",
      projectId: "crystal-cove-8361f",
      storageBucket: "crystal-cove-8361f.appspot.com",
      messagingSenderId: "364323934851",
      appId: "1:364323934851:web:cd42aa0618c717078ec1b6"
    }),
    // BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: ErrorhandlerInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
