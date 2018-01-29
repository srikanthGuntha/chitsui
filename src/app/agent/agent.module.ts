import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from "ag-grid-angular";

import { AgentComponent } from './agent.component';
import { AgentHeaderComponent } from './header/header.component';
import { AgentChitsComponent } from './chits/chits.component';
import { AgentUsersComponent } from './users/users.component';
import { ModalComponent } from './modal/modal.component';

const appAgentRoutes: Routes = [
  { path: '', redirectTo: 'users' },
  { path: '', component: AgentHeaderComponent, outlet:'header' },
  { path: 'users', component: AgentUsersComponent},
  { path: 'chits', component: AgentChitsComponent},
  { path: 'agent/**', redirectTo: 'users', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AgentComponent,
    AgentHeaderComponent,
	  AgentChitsComponent,
    AgentUsersComponent,
    ModalComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    CommonModule,
    RouterModule.forChild(appAgentRoutes),
    AgGridModule.withComponents([ ])
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AgentComponent]
})
export class AgentModule { }
