import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './features/mainlayout/header/header.component';
import {HttpClientModule} from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DialogoptionsComponent,
    AddFormDialogComponent,
    EditFormComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
