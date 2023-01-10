import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-trainers',
  templateUrl: './add-trainers.component.html',
  styleUrls: ['./add-trainers.component.css']
})
export class AddTrainersComponent implements OnInit {
  //declaration des variables globale
  addChefForm:FormGroup;
  chef:any={};
  id:any;
  title:any;
  title1:any;
  title2:any;
  users:any;
  firstNameError:any=false;
  lastNameError:any=false;
emailError:any=false;
passwordError:any=false;
confirmError:any=false;
  constructor(private fb:FormBuilder, private activatedRoute:ActivatedRoute, private userService:UserService) { }

  ngOnInit() {

    this.addChefForm =this.fb.group({ 
      firstName :[''],
      lastName :[''],
      email :[''],
      password :[''],
      speciality :[''],
      experience :[''],
      dateOfBirth :[''],
    })
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.title1="Edit";
      this.title2="Trainers";
      this.userService.getUser(this.id).subscribe(
        (data)=>{
          this.chef=data.user

        });

      // this.users=JSON.parse(localStorage.getItem("users")||"[]");
      // for (let i = 0; i < this.users.length; i++) {
      //   if (this.users[i].id==this.id) {
      //     this.chef=this.users[i];
          
      //   }
        
      // }
      
    }
    else{
      this.title1="Add ";
      this.title2="Trainers";

    }
  }
  addChef(){
    
    if (this.id) {
      //edit
      this.userService.updateUser(this.chef).subscribe(
        (data)=>{
          console.log(data.message)
        }
      )

      // for (let i = 0; i < this.users.length; i++) {
      //  if (this.users[i]==this.id) {
      //    this.users[i]=this.chef;
         
      //  }
        
      // }
      // localStorage.setItem("users",JSON.stringify(this.users));
    }
    else{
    console.log(this.chef);
    if (this.chef.firstName.length <3) {
      
      this.firstNameError=true;
    }
    if (this.chef.lastName.length <3) {
    
      this.lastNameError=true;
    }
    if (!(this.validateEmail(this.chef.email))) {
      
      this.emailError=true;
    }

    if (this.chef.password.length <3) {
    
      this.passwordError=true;
    }
    if (this.chef.confirmPassword !== this.chef.password) {
    
      this.confirmError=true;
    }
    if (!this.firstNameError && !this.lastNameError && !this.emailError && !this.passwordError && !this.confirmError) {
      
    
    // let idChef = JSON.parse(localStorage.getItem("idUser")||"1");
    // this.chef.id = idChef;
    this.chef.role ="trainers";
    this.userService.createUser(this.chef).subscribe(
      (data)=>{
        console.log(data.message);
      })
    // let users = JSON.parse(localStorage.getItem("users")||"[]");
    // users.push(this.chef);
    // localStorage.setItem("users",JSON.stringify(users));
    // localStorage.setItem("idUser",idChef+1);
    
  }
    }
}
validateEmail(email) {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}


}
