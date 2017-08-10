import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineCalendarComponent } from './discipline-calendar.component';

describe('DisciplineCalendarComponent', () => {
  let component: DisciplineCalendarComponent;
  let fixture: ComponentFixture<DisciplineCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplineCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
