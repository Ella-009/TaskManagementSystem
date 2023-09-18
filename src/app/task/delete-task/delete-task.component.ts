import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

export interface DialogData {
  id: number; 
}

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})

export class DeleteTaskComponent { 
  quoteId: number = 0; 

  constructor(public dialogRef: MatDialogRef<DeleteTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private dataService: DataService, private router: Router) {
    this.quoteId = data.id;
  } 

  onCancel(): void {
    this.dialogRef.close(); 
  } 

  onSubmit(): void {
    this.dataService.deleteQuote(this.quoteId)
    .subscribe({
      next: (response) => {
        console.log("Successfully delete a quote!" + response); 
        this.dialogRef.close(); 
        //debugger;
      },
      error: (error) => {
        console.log("error: " + error); 
        this.router.navigate(['/notfound']); 
      }
    }); 
  } 
} 

