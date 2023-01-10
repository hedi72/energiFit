import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  @Input() childTrainer:any;
  constructor() { }

  ngOnInit() {
  }

}
