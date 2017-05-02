import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementOpenProgramComponent } from './element-open-program.component';

describe('ElementOpenProgramComponent', () => {
  let component: ElementOpenProgramComponent;
  let fixture: ComponentFixture<ElementOpenProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementOpenProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementOpenProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
