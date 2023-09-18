import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; 
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root' 
})
export class DataService { 
  private allQuotesUrl = 'https://localhost:7206/api/Quote/all'; 
  private allQuoteTypesUrl = 'https://localhost:7206/api/QuoteType/all'; 
  private addQuoteUrl = 'https://localhost:7206/api/Quote/add'; 
  
  constructor(private http: HttpClient) { } 

  getAllQuotes(): Observable<any> {
    return this.http.get(this.allQuotesUrl)
    .pipe(
      catchError(this.handleError)
    );
  } 

  getQuoteDetail(id: string | null): Observable<any> { 
    const apiUrl = 'https://localhost:7206/api/Quote/' + id;
    return this.http.get(apiUrl)
    .pipe(
      catchError(this.handleError)
    ); 
  }  

  getAllQuoteTypes(): Observable<any> {
    return this.http.get(this.allQuoteTypesUrl)
    .pipe(
      catchError(this.handleError)
    );
  } 

  addQuote(requestBody: any): Observable<any> { 
    //debugger;
    return this.http.post(this.addQuoteUrl, requestBody)
    .pipe(
      catchError(this.handleError) 
    ); 
  } 

  updateQuote(id: number, requestBody: any): Observable<any> { 
    const apiUrl = 'https://localhost:7206/api/Quote/update/' + id;
    //debugger;
    return this.http.put(apiUrl, requestBody) 
    .pipe(
      catchError(this.handleError)
    );
  } 

  deleteQuote(id: number): Observable<any> {
    const apiUrl = 'https://localhost:7206/api/Quote/delete/' + id; 
    return this.http.delete(apiUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred: ', error); 
    return throwError('Something went wrong. Please try again later.'); 
  }
} 
