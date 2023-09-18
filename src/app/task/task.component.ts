import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'; 
import { DataService } from '../data.service'; 

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component'; 

import { Subject } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { DeleteTaskComponent } from './delete-task/delete-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  displayedColumns: string[] = ['Id', 'QuoteType', 'Description', 'Sales', 'DueDate', 'Premium', 'Operations']; 
  entries: number[] = [5, 10, 15, 20, 25]; 
  selectedEntry: number = 5; 
  orders: string[] = ['id', 'typeId', 'description', 'dueDate', 'premium', 'sales']; 
  selectedOrder: string = 'id'; 
  decend: boolean = false; 
  search: string = ""; 
  paginatorVisible: boolean = true;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); 
  private dataSubject = new Subject<any[]>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private dataService: DataService, private http: HttpClient, private router: Router, private authService: AuthenticationService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataService.getAllQuotes()
    .subscribe({
      next: (response) => {
        console.log("Successfully get all quotes!"); 
        this.dataSource.data = response; 
        //debugger; 
        this.paginator.pageSize = this.selectedEntry; 
        this.dataSource.paginator = this.paginator;   
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const dataInfo = JSON.stringify(data); 
          return dataInfo.toLowerCase().includes(filter); 
        };
        this.dataSubject.subscribe(data => {
          this.dataSource.data = data;
        })
          //debugger;
      },
      error: (error) => {
        console.log("error: " + error); 
        this.router.navigate(['/notfound']); 
      }
    }); 
  } 

  openAddDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {data: {id: 0}, width: '70%'}); 
    dialogRef.componentInstance.taskAdded
    .subscribe({
      next: (response: any) => { 
        this.dataService.addQuote(response)
        .subscribe({
          next: (response) => {
            console.log("Close add dialog!" + response); 
            this.dataSource.data.push(response); 
            this.dataSubject.next(this.dataSource.data); 
            //debugger;
          },
          error: (error) => {
            console.log("error: " + error); 
            this.router.navigate(['/notfound']); 
          }
        });
        
        //debugger; 
        //this.router.navigate(['/task']);
      },
    });
  } 

  openUpdateDialog(id: number): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {data: {id: id}, width: '70%'}); 
    dialogRef.componentInstance.taskAdded
    .subscribe({
      next: (response: any) => {  
        this.dataService.updateQuote(response.id, response)
        .subscribe({
          next: (response) => {
            console.log("Close update dialog!" + response); 
            this.updateDataSource(response.id, response); 
            //debugger;
          },
          error: (error) => {
            console.log("error: " + error); 
            this.router.navigate(['/notfound']); 
          }
        }); 
        //debugger; 
        //this.router.navigate(['/task']);
      },
    });
  } 

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {data: {id: id}, width: '20%'}); 
    dialogRef.afterClosed()
    .subscribe((response) =>{
      this.deleteData(); 
    });
  }

  updateDataSource(id: number, quote: any) { 
    //debugger; 
    this.dataSource.data.forEach((item, index) => {
      if (item.id == id) {
        this.dataSource.data[index] = quote; 
        //debugger;
      }
    });
    this.dataSubject.next(this.dataSource.data); 
    //debugger;
  } 

  deleteData() {
    this.dataService.getAllQuotes()
    .subscribe({
      next: (response) => {
        this.dataSource.data = response; 
        this.dataSubject.next(this.dataSource.data); 
      },
      error: (error) => {
        console.log("error: " + error); 
        this.router.navigate(['/notfound']); 
      }
    }); 
  }

  viewQuoteDetail(id: number) { 
    debugger; 
    this.router.navigate(['/task/task-detail', id]); 
  }

  sortTable() { 
    if (this.decend) {
      this.dataSource.data.sort((a, b) => {
        if (a[this.selectedOrder] < b[this.selectedOrder]) {
          return 1; 
        } else if (a[this.selectedOrder] > b[this.selectedOrder]) {
          return -1; 
        } else {
          return 0; 
        }
      }); 
    } else {
      this.dataSource.data.sort((a, b) => {
        if (a[this.selectedOrder] < b[this.selectedOrder]) {
          return -1; 
        } else if (a[this.selectedOrder] > b[this.selectedOrder]) {
          return 1; 
        } else {
          return 0; 
        }
      }); 
    }
    this.dataSubject.next(this.dataSource.data);
  }

  reverseTable() { 
    this.dataSource.data.reverse(); 
    this.dataSubject.next(this.dataSource.data);
  }

  searchTable() { 
    this.dataSource.filter = this.search.trim().toLowerCase();
  } 

  logout() {
    this.authService.isAuthenticated = false; 
    this.router.navigate(['/user']); 
  } 

  changeEntrySize() {
    this.paginator.pageSize = this.selectedEntry; 
    this.paginator.pageIndex = 0; 
    //debugger; 
    this.cdr.detectChanges(); 
    //this.cdr.markForCheck();
    console.log(this.paginator.pageSize)
  }
}
