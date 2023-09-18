import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { UserComponent } from './user/user.component'; 

import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { MatCardModule } from '@angular/material/card';  
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { TaskModule } from './task/task.module'; 


import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; 
import { MatTableDataSource, MatTableModule } from '@angular/material/table';  
import { MatIconModule } from '@angular/material/icon';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskDialogComponent } from './task/task-dialog/task-dialog.component';
import { PasswordMatchDirective } from './password-match.directive'; 

import { MatInputModule } from '@angular/material/input';
import { PremiumPipe } from './premium.pipe'; 

import { LocationStrategy, HashLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent, 
    TaskComponent, NotFoundComponent, PremiumPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    UserModule, 
    TaskModule, 
    MatButtonToggleModule, 
    MatCardModule, 
    FormsModule, 
    MatPaginatorModule, 
    MatTableModule, 
    MatIconModule, 
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
