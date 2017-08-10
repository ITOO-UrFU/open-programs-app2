import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineInformationComponent } from './discipline-information.component';

describe('DisciplineInformationComponent', () => {
  let component: DisciplineInformationComponent;
  let fixture: ComponentFixture<DisciplineInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplineInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
