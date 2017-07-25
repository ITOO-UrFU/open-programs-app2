import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrajectoriesListComponent } from './user-trajectories-list.component';

describe('UserTrajectoriesListComponent', () => {
  let component: UserTrajectoriesListComponent;
  let fixture: ComponentFixture<UserTrajectoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTrajectoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTrajectoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
