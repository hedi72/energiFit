import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FeaturesComponent } from './components/features/features.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { PackagesComponent } from './components/packages/packages.component';
import { ClassesComponent } from './components/classes/classes.component';
import { BannerComponent } from './components/banner/banner.component';
import { AddTrainersComponent } from './components/add-trainers/add-trainers.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { DashboardTrainersComponent } from './components/dashboard-trainers/dashboard-trainers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TrainerComponent } from './components/trainer/trainer.component';
import { ClassComponent } from './components/class/class.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    FeaturesComponent,
    PricingComponent,
    TrainersComponent,
    BlogsComponent,
    PackagesComponent,
    ClassesComponent,
    BannerComponent,
    AddTrainersComponent,
    AddAdminComponent,
    DashboardAdminComponent,
    DashboardTrainersComponent,
    TrainerComponent,
    ClassComponent,
    DisplayUserComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
