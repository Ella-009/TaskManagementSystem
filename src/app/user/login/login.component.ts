import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router'; 
import { UserService } from 'src/app/user.service';  


import {
  FormControl, 
  FormGroupDirective, 
  FormGroup, 
  FormBuilder, 
  NgForm, 
  Validators,
} from '@angular/forms'; 
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted; 
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted)); 
  }
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 
  userNameFormControl = new FormControl('', [Validators.required]); 
  passwordFormControl = new FormControl('', [Validators.required]); 
  matcher = new MyErrorStateMatcher(); 

  loginForm: FormGroup; 
  
  constructor(private userService: UserService, private http: HttpClient, private authService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.loginForm = formBuilder.group({
      userName: this.userNameFormControl, 
      password: this.passwordFormControl
    });
  } 

  onSubmit(loginForm: any) {
    if (loginForm.valid) { 

      const userName = loginForm.value.userName; 
      const password = loginForm.value.password; 

      const requestBody = {
        "name": userName,
        "password": password
      }; 

      this.userService.login(requestBody) 
      .subscribe({
        next: (response) => {
          console.log("Successfully login!"); 
          localStorage.setItem('token', response.token);
          this.authService.isAuthenticated = true; 
          const dialogRef = this.dialog.open(ErrorDialogComponent, {data: {message: "Successfully login!"}, width: '25%', position: { top: '2%', right: '2%'}}); 
          this.router.navigate(['/task']); 
        },
        error: (error) => {
          console.log("error: " + error); 
          //this.router.navigate(['/notfound']);  
          this.openErrorDialog(); 
        }
      }); 
    }
  } 

  openErrorDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {data: {message: "Login failed!"}, width: '25%', position: { top: '2%', right: '2%'}}); 
  } 
}
