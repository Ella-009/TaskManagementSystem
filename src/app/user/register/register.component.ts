import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router'; 
import { UserService } from 'src/app/user.service'; 


import {
  FormControl, 
  FormGroupDirective, 
  NgForm, 
  Validators,
  ValidatorFn,
  FormGroup,
  ValidationErrors,
  AbstractControl,
  FormBuilder
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
 
// export function confirmPasswordValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     const passwordControl = control.get('password');
//     const confirmPwdControl = control.get('confirmPwd');

//     debugger;
//     if (!passwordControl || !confirmPwdControl) {
//       return null; // Return null if controls are not found (for example, during form initialization)
//     }

//     if (passwordControl.value !== confirmPwdControl.value) {
//       confirmPwdControl.setErrors({ passwordMismatch: true });
//       return { passwordMismatch: true };
//     } else {
//       confirmPwdControl.setErrors(null);
//       return null;
//     }
//   };
// }

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent { 
  userNameFormControl = new FormControl('', [Validators.required]); 
  passwordFormControl = new FormControl('', [Validators.required]); 
  confirmPwdFormControl = new FormControl('', [Validators.required]); 

  matcher = new MyErrorStateMatcher(); 

  signupForm: FormGroup;

  constructor(private userService: UserService, private http: HttpClient, private router: Router, private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.signupForm = this.formBuilder.group({
      userName: this.userNameFormControl,
      password: this.passwordFormControl,
      confirmPwd: this.confirmPwdFormControl,
    });
  } 

  onSubmit(signupForm: any) {
    if (signupForm.valid) {
      const userName = signupForm.value.userName; 
      const password = signupForm.value.password; 
      const confirmPwd = signupForm.value.confirmPwd; 

      const requestBody = {
          "name": userName,
          "password": password,
          "confirmPwd": confirmPwd
      }; 
      //debugger;
      this.userService.signup(requestBody) 
      .subscribe({
        next: (response) => { 
          if (response == null) {
            this.openErrorDialog(); 
          } else {
            console.log("Successfully signup!"); 
            this.router.navigate(['/user']); 
            const dialogRef = this.dialog.open(ErrorDialogComponent, {data: {message: "Successfully register!"}, width: '25%', position: { top: '2%', right: '2%'}}); 
          }
        },
        error: (error) => {
          console.log("error: " + error); 
          this.router.navigate(['/notfound']); 
        }
      }); 
    }
  }

  openErrorDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {data: {message: "Register failed! User already exists!"}, width: '25%', position: { top: '2%', right: '2%'}}); 
  } 
} 


