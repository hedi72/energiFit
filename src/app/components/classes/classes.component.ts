import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/services/classe.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  classes:any;
  constructor(private classeService:ClasseService,private reservationService:ReservationService) { }

  ngOnInit() {
    this.classeService.getClasses().subscribe(
      (data)=>{
        console.log(data.classes);
        this.classes=data.classes
      }
    )
  
    
  
  }
}
