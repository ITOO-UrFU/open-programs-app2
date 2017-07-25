import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrajectoryBlockComponent } from './user-trajectory-block.component';

describe('UserTrajectoryBlockComponent', () => {
  let component: UserTrajectoryBlockComponent;
  let fixture: ComponentFixture<UserTrajectoryBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTrajectoryBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTrajectoryBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
