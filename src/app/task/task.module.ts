import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatTableModule } from '@angular/material/table';  
import { MatIconModule } from '@angular/material/icon'; 

import { HttpClientModule } from '@angular/common/http';  

import { MatDialogModule } from '@angular/material/dialog'; 


import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { MatCard, MatCardModule } from '@angular/material/card'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';  

import { TaskDetailComponent } from './task-detail/task-detail.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';

import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select'; 
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TaskDialogComponent } from './task-dialog/task-dialog.component'; 



@NgModule({
  declarations: [TaskDetailComponent, DeleteTaskComponent, TaskDialogComponent],
  imports: [
    CommonModule, 
    MatPaginatorModule, 
    MatTableModule, 
    HttpClientModule, 
    MatIconModule, 
    MatDialogModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    NgFor, 
    MatDatepickerModule, 
    MatNativeDateModule, 
  ]
})
export class TaskModule { }
