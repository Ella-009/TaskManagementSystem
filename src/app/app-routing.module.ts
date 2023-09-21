import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGard } from './auth.guard';
import { UserComponent } from './user/user.component';
import { TaskComponent } from './task/task.component';
import { DeleteTaskComponent } from './task/delete-task/delete-task.component'; 
import { TaskDetailComponent } from './task/task-detail/task-detail.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [ 
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UserComponent }, 
  { path: 'user/login', component: LoginComponent }, 
  { path: 'user/register', component: RegisterComponent }, 
  { path: 'task', component: TaskComponent, },  
  { path: 'task/task-dialog', component: TaskDetailComponent, canActivate: [AuthGard] }, 
  { path: 'task/delete-task/:id', component: DeleteTaskComponent, canActivate: [AuthGard] }, 
  { path: 'task/task-detail/:id', component: TaskDetailComponent, canActivate: [AuthGard] }, 
  { path: '**', redirectTo: 'notFound'}, 
  { path: 'notFound', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
