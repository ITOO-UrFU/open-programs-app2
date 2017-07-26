import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProfileBlockComponent } from './menu-profile-block.component';

describe('MenuProfileBlockComponent', () => {
  let component: MenuProfileBlockComponent;
  let fixture: ComponentFixture<MenuProfileBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuProfileBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProfileBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
