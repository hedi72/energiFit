import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from 'src/app/services/classe.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  @Input() childClass:any;
  users:any;
  id:any;
  user:any={};
  classes:any;
  connectedUser:any={};

 
  constructor( private formBuilder : FormBuilder,private activatedRouter:ActivatedRoute,private router : Router,private classeService:ClasseService,private reservationService:ReservationService) { }

  ngOnInit() {
    this.formBuilder.group({
      idClass :[''],
      idPlayer :[''],
      namePlayer :['']
    })
    this.id=this.activatedRouter.snapshot.paramMap.get('id');
    console.log(this.id);
    
    this.connectedUser=JSON.parse(localStorage.getItem("connectedUser")||'[]');
  

    this.classeService.getClasses().subscribe(
      (data)=>{
        // console.log(data.plats);
        this.classes=data.classes
        console.log(this.classes);
      }
    )
  

}
reservation(id:any){
  // alert('test');
if (this.connectedUser.role=='player') {
  this.router.navigate([`reservation/${id}`]);
  this.user.idClass=this.activatedRouter.snapshot.paramMap.get('id');
  console.log('idclass', this.activatedRouter.snapshot.paramMap.get('id'));
  
  this.user.idPlayer=this.connectedUser;
  this.user.namePlayer=this.connectedUser.firstName;
  console.log('here ', this.user.namePlayer);
  
  if (this.user.idClass !==null) {
    this.reservationService.addReservation(this.user).subscribe(
      (data)=>{
        console.log(data.message);
        console.log('rservation with succes');
        alert("reservation with succes")
      }
     
      
    )
    
  }
  
} else {
  this.router.navigate(['signup']);
  
}

 

}


}
