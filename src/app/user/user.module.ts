import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 

import { HttpClientModule } from '@angular/common/http'; 
import { PasswordMatchDirective } from '../password-match.directive';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, PasswordMatchDirective],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,  
    MatCardModule, 
    MatInputModule, 
    MatFormFieldModule, 
    HttpClientModule
  ], 
  exports: [LoginComponent, RegisterComponent]
}) 

export class UserModule { }
