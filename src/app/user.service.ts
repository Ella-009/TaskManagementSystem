import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginUrl = "https://localhost:7206/api/User/login";  
  private signupUrl = "https://localhost:7206/api/User/signup";  
  
  constructor(private http: HttpClient) { } 

  login(requestBody: any): Observable<any> {
    return this.http.post(this.loginUrl, requestBody) 
    .pipe(
      catchError(this.handleError)
    ); 
  } 

  signup(requestBody: any): Observable<any> {
    return this.http.post(this.signupUrl, requestBody)
    .pipe(
      catchError(this.handleError)
    ); 
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred: ', error); 
    return throwError('Something went wrong. Please try again later.'); 
  }
} 

