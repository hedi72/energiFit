import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {
  users:any;
  trainers:any=[];
  constructor( private userService:UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (data)=>{
      console.log(data.users);
      this.users=data.users;
    
        for(let i=0; i<this.users.length; i++){
       
        if(this.users[i].role=="trainers"){
          this.trainers.push(this.users[i]);}


  }

})
  }
}

