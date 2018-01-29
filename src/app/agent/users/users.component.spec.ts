import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentUsersComponent } from './users.component';

describe('AgentUsersComponent', () => {
  let component: AgentUsersComponent;
  let fixture: ComponentFixture<AgentUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
