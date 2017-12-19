import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChitsComponent } from './chits.component';

describe('UserChitsComponent', () => {
  let component: UserChitsComponent;
  let fixture: ComponentFixture<UserChitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
