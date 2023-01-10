import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  //Declaration des variables avant le constructor

//Etape 1
user:any={};
users:any={};
id:any;
title:string;
title1:string;
title2:string;
firstNameError:any=false;

lastNameError:any=false;
emailError:any=false;
passwordError:any=false;
confirmError:any=false;
//Etape 2
addAdminForm :FormGroup;

  constructor( private formBuilder : FormBuilder, private activatedRoute:ActivatedRoute ,
    private userService:UserService) { }

  ngOnInit() {
    this.addAdminForm=this.formBuilder.group({
      firstName :[''],
      lastName :[''],
      email :[''],
      password :[''],
      confirmPassword :[''],
      tel :[''],
      role:['']

      


    })
    this.id =this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      
      this.title1="Edit"
      this.title2="User"
  //recuperation des données par id
      this.userService.getUser(this.id).subscribe(
        (data)=>{
          this.user=data.user;
        }
      )
    }
    else{
      
     
      this.title1="Add"
      this.title2="Admin"

    }
  }
  addAdmin(){
    if (this.id) {
     
    this.userService.updateUser(this.user).subscribe(
      (data)=>{
        console.log(data.message);
      }
    )
    }
    else{
      if (this.user.firstName.length <3) {
      
        this.firstNameError=true;
      }
      if (this.user.lastName.length <3) {
      
        this.lastNameError=true;
      }
      // var verifEmail =this.validateEmail(this.user.email);
      if (!(this.validateEmail(this.user.email))) {
      
        this.emailError=true;
      }
      if (this.user.password.length <3) {
      
        this.passwordError=true;
      }
      if (this.user.confirmPassword !== this.user.password) {
      
        this.confirmError=true;
      }
      if (!this.firstNameError && !this.lastNameError && !this.emailError && !this.passwordError && !this.confirmError) {
     
      this.user.role="admin";
  
      this.userService.createUser(this.user).subscribe(
        (data)=>{
          console.log(data.message);
        }
      )
 
      
    }

    
    
  }}



   validateEmail(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
  }
}
