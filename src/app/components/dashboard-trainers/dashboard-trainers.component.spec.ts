import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrainersComponent } from './dashboard-trainers.component';

describe('DashboardTrainersComponent', () => {
  let component: DashboardTrainersComponent;
  let fixture: ComponentFixture<DashboardTrainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTrainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
