import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from 'src/app/services/classe.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-trainers',
  templateUrl: './dashboard-trainers.component.html',
  styleUrls: ['./dashboard-trainers.component.css']
})
export class DashboardTrainersComponent implements OnInit {
// title ="add classe";
classe:any={};
addClasseForm:FormGroup;
connectedUser:any={};
id:any;
title:any;
users:any;
classes:any;
myClasses: any =[];
messageAdd:any;
reservations:any;

constructor(private fb :FormBuilder ,private classeService:ClasseService, private router:Router,private activatedRoute:ActivatedRoute,private userService:UserService,private reservationService:ReservationService) { }

ngOnInit() {
  this.reservationService.getReservations().subscribe(
    (data)=>{
      // console.log(data.plats);
      this.reservations=data.reservations;
      console.log("reservation",this.reservations);
    }
  )
  this.classeService.getClasses().subscribe(
    (data)=>{
      // console.log(data.classes);
      this.classes=data.classes
      console.log(this.classes);
    }
  )
 
  this.addClasseForm=this.fb.group({
    className:[''],
    price:[''],
    description:['']
  })
this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
this.id = this.activatedRoute.snapshot.paramMap.get('id');
this.userService.getUsers().subscribe(
(data)=>{
console.log(data.users);
this.users=data.users;
//*********** */
// for(let i=0; i<this.users.length; i++){
//   if((this.users[i].role=="admin")||(this.users[i].role=="client")){
//    this.adminsClients.push(this.users[i]);
//   }else if(this.users[i].role=="chef"){
//     this.chefs.push(this.users[i]);
//   }
// }

})
if (this.id) {
//edit
this.title='Edit Classe'
//recuperation des anciens valeur
this.classeService.getClasse(this.id).subscribe(
  (data)=>{
    this.classe=data.classe
  }
)

} else {
this.title='Add Classe'

}
//Solution 1
// this.platService.getPlats().subscribe(
//   (data)=>{
//     this.plats = data.plats
//     //filtrage
//     for (let i = 0; i <this.plats.length; i++) {
//       if (this.plats[i].idChef==this.connectedUser._id) {
//         this.myPlats.push(this.plats[i])
      
//       }
           
//     }
//   }
// )
//************solution2 */
this.classeService.getMyClasses(this.connectedUser._id).subscribe(
(data)=>{
  console.log("my classes",data.myClasses);
  
  this.myClasses=data.myClasses

}
)

// this.plats=JSON.parse(localStorage.getItem("plats")||"[]");
//********* filtrage ******************
//   for (let i = 0; i < this.plats.length; i++) {
//     if (this.plats[i].idChef==this.connectedUser.id) {
//       this.myPlats.push(this.plats[i]);
    
//     }
  
//   }
}
// addPlat(){
  
//   if (this.id) {
//     //edit
//     for (let i = 0; i < this.users.length; i++) {
//      if (this.users[i]==this.id) {
//        this.users[i]=this.plat;

     
//      }
    
//     }
//     localStorage.setItem("plats",JSON.stringify(this.plats));
//   }
//   else{
//   console.log(this.plat);
//   let idplat = JSON.parse(localStorage.getItem("idplat")||"1");
//   this.plat.id = idplat;
//   // this.chef.role ="chef";
//   let plats = JSON.parse(localStorage.getItem("plats")||"[]");
//   plats.push(this.plat);
//   localStorage.setItem("plats",JSON.stringify(plats));
//   localStorage.setItem("idplat",idplat+1);
// }

// }
refresh(){
this.router.navigate(['dashboard-trainers']);
}
addClasse(){
// let idPlat=JSON.parse(localStorage.getItem("idPlat")||"1");
// this.plat.id=idPlat;
if (this.id) {
  //edit
  this.classeService.updateClasse(this.classe).subscribe(
    (data)=>{
      console.log(data.message);
      
    }
  )
  //reload
  let currentUrl = this.router.url;
  // routeReuseStrategy:ne pas détruire un composant, mais en fait de le sauvegarder -
  // pour un re-rendu à une date ultérieure.
  //*****mettre en cache */
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      //gerer une demande navigation vers l'url actuel
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);

  this.router.navigate(['dashboard-trainers']);
} else {
  this.classe.idTrainer=this.connectedUser._id;
  this.classeService.addClasse(this.classe).subscribe(
    (data)=>{
      console.log(data.message);
      this.messageAdd=data.message;
    }
  )
  // this.plats.push(this.plat);
  // localStorage.setItem("plats",JSON.stringify(this.plats));
  // localStorage.setItem("idPlat", idPlat +1);

   //reload
   let currentUrl = this.router.url;
   // routeReuseStrategy:ne pas détruire un composant, mais en fait de le sauvegarder -
   // pour un re-rendu à une date ultérieure.
   //*****mettre en cache */
       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       //gerer une demande navigation vers l'url actuel
       this.router.onSameUrlNavigation = 'reload';
       this.router.navigate([currentUrl]);
  
  
  this.router.navigate(['dashboard-trainers']); 
}


}
displayClasse(id){
this.router.navigate([`displayClasse/${id}`]);

}
deleteClasse(id)
{
this.classeService.deleteClasse(id).subscribe(
  (data)=>{
    console.log(data.message);
    this.classeService.getMyClasses(this.connectedUser._id).subscribe(
      (data)=>{
        this.myClasses=data.myClasses
      })
    


    
  }

)


}
editClasse(id:any){
this.router.navigate([`editClass/${id}`]);



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
