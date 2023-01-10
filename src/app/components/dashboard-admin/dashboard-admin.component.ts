import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClasseService } from 'src/app/services/classe.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  chef:any={};
  users:any;
  classes:any;
  reservations:any;
  adminsClients:any=[];
  trainers : any=[];
  players : any=[];
  constructor(private router : Router , private userService:UserService ,private classeService:ClasseService,private reservationService:ReservationService ) { }

  ngOnInit() {

    this.reservationService.getReservations().subscribe(
      (data)=>{
        // console.log(data.classes);
        this.reservations=data.reservations;
        console.log("reservation",this.reservations);
      }
    )
  
  
// this.users =JSON.parse(localStorage.getItem("users")||"[]");
this.userService.getUsers().subscribe(
  (data)=>{
  console.log(data.users);
  this.users=data.users;

    for(let i=0; i<this.users.length; i++){
   
    if(this.users[i].role =="trainers"){
      this.trainers.push(this.users[i]);
      console.log(this.trainers);
      
    }else if(this.users[i].role=="player"){
      this.players.push(this.users[i]);
    }
  }
  
  
    
      
    });
    this.classeService.getClasses().subscribe(
      (data)=>{
        // console.log(data.classes);
        this.classes=data.classes
        console.log(this.classes);
      }
    )
    
    
  }
  displayUser(id:any){
    alert('test');
    this.router.navigate([`displayUser/${id}`]);
  
  
  }
  editUser(id:any,role:any){
    // alert('test');
    if (role == "trainers" || role =="admin") {
      this.router.navigate([`editUser/${id}`]);
      
      
    }else{
      this.router.navigate([`editPlayer/${id}`]);
  
  
    }
 
  }
  deleteUser(id:any){
    this.userService.deleteUser(id).subscribe(
      (data)=>{
        console.log(data.message);
        // this.userService.getUsers().subscribe(
        //   (data)=>{
        //     this.users=data.users
        //   }
        // )
         
      })
    //   this.router.navigateByUrl('/dashboardAdmin', { skipLocationChange: true }).then(() => {
    //     this.router.navigate(['/dashboardAdmin']);
    // });
    
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    // routeReuseStrategy:ne pas détruire un composant, mais en fait de le sauvegarder -
    // pour un re-rendu à une date ultérieure.
    //*****mettre en cache */
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        //gerer une demande navigation vers l'url actuel
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
  }
