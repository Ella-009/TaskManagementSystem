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
  displayedColumns: string[] = ['Id', 'QuoteType', 'Description', 'Sales', 'DueDate', 'Premium', '']; 

  entries: number[] = [5, 10, 15, 20, 25]; 
  selectedEntry: number = 5; 
  orders: string[] = ['id', 'typeId', 'description', 'dueDate', 'premium', 'sales']; 
  selectedOrder: string = 'id'; 
  decend: boolean = false; 
  search: string = ""; 
  
  //related to paginator
  currentPage: number = 1; 
  pages: number[] = []; 
  pageCount: number = 0;
  pageIndex: number = 0; 

  tableData: any;
  dataSource: any; 

  private dataSubject = new Subject<any[]>(); 
  private tableSubject = new Subject<any[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private dataService: DataService, private http: HttpClient, private router: Router, private authService: AuthenticationService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataService.getAllQuotes()
    .subscribe({
      next: (response) => {
        console.log("Successfully get all quotes!"); 
        this.dataSource = response; 
        this.getTableData(); 
        this.getPages(); 
        
        this.dataSubject.subscribe(data => {
          this.dataSource = data; 
        }) 
        this.tableSubject.subscribe(data => {
          this.tableData = data; 
        })
          //debugger;
      },
      error: (error) => {
        console.log("error: " + error); 
        this.router.navigate(['/notfound']); 
      }
    }); 
  }  

  getTableData() {
    this.tableData = this.dataSource.slice((this.currentPage - 1) * this.selectedEntry, this.currentPage * this.selectedEntry); 
    this.tableSubject.next(this.tableData); 
  } 

  getPages() { 
    this.currentPage = 1;
    this.pageCount = Math.ceil( this.dataSource.length / this.selectedEntry ); 
    this.pages = [];
    for (let i = 1; i <= this.pageCount; i++) {
      this.pages.push(i); 
    }
  } 

  setCurrentPage() {
    this.getTableData(); 
    this.tableSubject.next(this.tableData); 
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
            this.dataSource.push(response); 
            this.dataSubject.next(this.dataSource); 
            this.getPages(); 
            this.getTableData(); 
            //debugger;
          },
          error: (error) => {
            console.log("error: " + error); 
            this.router.navigate(['/notfound']); 
          }
        });
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
    this.dataSource.forEach((item: any, index: any) => {
      if (item.id == id) {
        this.dataSource[index] = quote; 
        //debugger;
      }
    });
    this.dataSubject.next(this.dataSource); 
    this.getTableData(); 
    //debugger;
  } 

  deleteData() {
    this.dataService.getAllQuotes()
    .subscribe({
      next: (response) => {
        this.dataSource = response; 
        this.dataSubject.next(this.dataSource); 
        this.getPages();
        this.getTableData(); 
      },
      error: (error) => {
        console.log("error: " + error); 
        this.router.navigate(['/notfound']); 
      }
    }); 
  }

  viewQuoteDetail(id: number) { 
    //debugger; 
    this.router.navigate(['/task/task-detail', id]); 
  }

  sortTable() { 
    if (this.decend) {
      this.dataSource.data.sort((a: any, b: any) => {
        if (a[this.selectedOrder] < b[this.selectedOrder]) {
          return 1; 
        } else if (a[this.selectedOrder] > b[this.selectedOrder]) {
          return -1; 
        } else {
          return 0; 
        }
      }); 
    } else {
      this.dataSource.data.sort((a: any, b: any) => {
        if (a[this.selectedOrder] < b[this.selectedOrder]) {
          return -1; 
        } else if (a[this.selectedOrder] > b[this.selectedOrder]) {
          return 1; 
        } else {
          return 0; 
        }
      }); 
    }
    this.dataSubject.next(this.dataSource);
    this.getTableData(); 
  }

  reverseTable() { 
    this.dataSource.data.reverse(); 
    this.dataSubject.next(this.dataSource); 
    this.getTableData(); 
  }

  searchTable() { 
    //this.dataSource.filter = this.search.trim().toLowerCase();
  } 

  logout() {
    this.authService.isAuthenticated = false; 
    this.router.navigate(['/user']); 
    localStorage.removeItem('token');
  } 

  changeEntrySize() { 
    this.getPages(); 
    this.getTableData(); 
    console.log("pages: " + this.pages); 
    console.log("current: " + this.currentPage); 
  } 

  toPrevious() {
    if (this.currentPage == 1) {
      return; 
    } else {
      this.currentPage--; 
    } 
    this.getTableData();
  } 

  toNext() {
    if (this.currentPage == this.pages[this.pages.length - 1]) {
      return; 
    } else {
      this.currentPage++;
    } 
    this.getTableData(); 
    //debugger; 
  }
}
