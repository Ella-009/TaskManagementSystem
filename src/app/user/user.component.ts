import { Component } from '@angular/core';   
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  selectedValue: string = "Login";  

  onClickLogin() {
    this.selectedValue = "Login"; 
  } 

  onClickRegister() {
    this.selectedValue = "Register"; 
  } 
}
