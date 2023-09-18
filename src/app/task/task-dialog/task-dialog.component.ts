import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventEmitter, Output } from '@angular/core'; 
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog'; 
import { Inject } from '@angular/core'; 
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';  

import { map } from 'rxjs/operators'; 


import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms'; 


import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted; 
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted)); 
  }
}

export interface DialogData {
  id: number; 
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit{ 
  //id: string | null = null; 
  quoteId: number = 0; 
  id: string ="0"; 
  @Output() taskAdded: EventEmitter<any> = new EventEmitter<any>();
  quoteTypes: any[] = []; 
  //dueDate: Date = new Date(); 

  matcher = new MyErrorStateMatcher(); 
  dialogForm: FormGroup; 

  constructor(private dataService: DataService, private dialogRef: MatDialogRef<TaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.quoteId = data.id; 
    this.id = String(data.id); 
    
    this.dialogForm = this.formBuilder.group({
      id: new FormControl(this.quoteId, []), 
      typeId: new FormControl('', [Validators.required]), 
      description: new FormControl('', [Validators.required]), 
      sales: new FormControl('', [Validators.required]), 
      dueDate: new FormControl(new Date(), [Validators.required]), 
      premium: new FormControl('', [Validators.required, this.isPositive])
    });
    
  }   

  onCancel() {
    this.dialogRef.close(); 
  }  

  ngOnInit() {
    // this.route.paramMap.subscribe(value => {
    //   this.id = value.get('id'); 
    //   if (this.id !== null) {
    //     this.quoteId = parseInt(this.id); 
    //   }
    // });  

    this.dataService.getAllQuoteTypes() 
    .subscribe({
      next: (response) => {
        this.quoteTypes = response; 
        //debugger; 
      },
      error: (error) => {
        console.log("error: " + error); 
      }
    }); 

    if (this.quoteId !== 0) {
      this.dataService.getQuoteDetail(String(this.quoteId)) 
      .subscribe({
        next: (response) => {
          this.dialogForm = this.formBuilder.group({
            id: new FormControl(this.quoteId, []), 
            typeId: new FormControl(response.typeId, [Validators.required]), 
            description: new FormControl(response.description, [Validators.required]), 
            sales: new FormControl(response.sales, [Validators.required]), 
            dueDate: new FormControl(this.getDate(response.dueDate), [Validators.required]), 
            premium: new FormControl(response.premium, [Validators.required, this.isPositive])
          });
        },
        error: (error) => {
          console.log("error: " + error); 
        }
      }); 
    }
  } 

  getDate(date: string): Date {
    const dateAndTime = (date.split("T")); 
    const dueDate = new Date(dateAndTime[0]); 
    //debugger;
    return dueDate; 
  }

  isPositive(control: any) {
    const input = control.value;
    //debugger;
    if (isNaN(parseFloat(input)) || parseFloat(input) <= 0) {
      return { isPositive: true }; // Return an error object if it's not a number
    }
  
    return null; // Return null if it's a number (validation passes)
  }

  onSubmit(dialogForm: any): void{ 
    //debugger;
    //console.log(dialogForm.value + " " + dialogForm.controls['premium']?.hasError('isNumber'));  
    if (dialogForm.valid) {
      const id = dialogForm.value.id;
      const typeId = dialogForm.value.typeId; 
      const sales = dialogForm.value.sales; 
      const premium = Number(parseFloat(dialogForm.value.premium).toFixed(2)); 
      //const dueDate = new Date(); 
      const dueDate = dialogForm.value.dueDate; 
      //debugger; 
      //const [hours, minutes, seconds] = time.split(':').map(Number);
      //const [hours, minutes, seconds] = time.split(':').map(Number);
      const description = dialogForm.value.description; 

      const quote = {
        "id": id, 
        "typeId": typeId, 
        "sales": sales, 
        "premium": premium, 
        "dueDate": dueDate, 
        "description": description
      }

      this.taskAdded.emit(quote); 
      //debugger;
      this.dialogRef.close(); 
    }
  } 
}
