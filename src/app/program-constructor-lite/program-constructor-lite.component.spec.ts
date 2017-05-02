import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramConstructorLiteComponent } from './program-constructor-lite.component';

describe('ProgramConstructorLiteComponent', () => {
  let component: ProgramConstructorLiteComponent;
  let fixture: ComponentFixture<ProgramConstructorLiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramConstructorLiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramConstructorLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
