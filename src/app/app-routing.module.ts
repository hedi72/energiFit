import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddTrainersComponent } from './components/add-trainers/add-trainers.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardTrainersComponent } from './components/dashboard-trainers/dashboard-trainers.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'signup',component:SignupComponent},
  {path:'add-trainers',component:AddTrainersComponent},
  {path:'add-admin',component:AddAdminComponent},
  {path:'dashboard-admin',component:DashboardAdminComponent},
  {path:'dashboard-trainers',component:DashboardTrainersComponent},
//dynamic path
  {path:'displayUser/:id',component:DisplayUserComponent},
  {path:'editUser/:id',component:AddAdminComponent},
  {path:'editPlayer/:id',component:SignupComponent},
  {path:'reservation/:id',component:HomeComponent},
  {path:'editClass/:id',component:DashboardTrainersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
