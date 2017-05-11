import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDisciplinesConstructorComponent } from './program-disciplines-constructor.component';

describe('ProgramDisciplinesConstructorComponent', () => {
  let component: ProgramDisciplinesConstructorComponent;
  let fixture: ComponentFixture<ProgramDisciplinesConstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramDisciplinesConstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDisciplinesConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
