import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service'; 

export interface DialogData {
  message: string; 
}

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit{
  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private dataService: DataService, private router: Router) { } 

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000); 
  } 

  onClose() {
    this.dialogRef.close(); 
  }
}
