import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from '../confirmPwd';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SignupForm:FormGroup;
  user:any={};
users:any={};
  id:any;
  title:string;
  title1:string;
  title2:string;
  constructor(private fb:FormBuilder , private activatedRoute:ActivatedRoute  , private userService:UserService) {

   }

  ngOnInit() {
    this.SignupForm=this.fb.group({
      firstName:['',[Validators.minLength(3),Validators.required]],
      lastName:['' ,[Validators.minLength(5),Validators.required]],
      email:['' ,[Validators.email,Validators.required]],
      password:['' ,[Validators.minLength(8),Validators.required]],
      confirmPassword:['' ,[Validators.minLength(8),Validators.required]],
      tel:['',[Validators.minLength(8),Validators.maxLength(13),Validators.required]]
      
    },
    {
      validator: MustMatch('password','confirmPassword')
      }
      );
      this.id =this.activatedRoute.snapshot.paramMap.get('id');  
      if (this.id) {
      
        this.title1="Edit"
        this.title2="Player"
    //recuperation des données par id
        this.userService.getUser(this.id).subscribe(
          (data)=>{
            this.user=data.user;
            console.log("data.user",this.user);
            
            this.SignupForm=this.fb.group({
              _id:this.id,
              firstName:this.user.firstName,
              lastName:this.user.lastName,
              email:this.user.email,
              password:this.user.password,
              confirmPassword:this.user.confirmPassword,
              tel:this.user.tel
              
            },
            {
              validator: MustMatch('password','confirmPassword')
              }
              );
          }
        )
      }
      else{
        
       
        this.title1="Sign"
        this.title2="Up"
  
      }
  
    }
  signup(user:any){
    
    console.log(user);
    if (this.id) {
      this.userService.updateUser(user).subscribe(
        (data)=>{
          console.log('helloo',data.message);
          console.log('helloo',data);
          console.log('helloo2',user);
         
        }
      )
      
    } else {
      user.role="player";

        this.userService.createUser(user).subscribe(
    (data)=>{
      // user.firstName=this.SignupForm.get('firstName')
      console.log(data.message);
    }
  )
      
    }
  
    
    


 
  }

}
