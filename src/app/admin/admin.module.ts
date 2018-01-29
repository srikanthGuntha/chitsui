import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { BranchService } from './_services/branches.service';
import { ChitsService } from './_services/chits.services';
import { ChitIdService } from './_services/chitid.services';
import { UserChitsService } from './_services/userchits.service';

import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './header/header.component';
import { AdminChitsComponent } from './chits/chits.component';
import { AdminChitidsComponent } from './chitids/chitids.component';
import { AdminBranchesComponent } from './branches/branches.component';
import { UserChitsComponent } from './userchits/userchits.component';

const appAdminRoutes: Routes = [
  { path: '', redirectTo: 'chits' },
  { path: '', component: AdminHeaderComponent, outlet:'header' },
  { path: 'chits', component: AdminChitsComponent},
  { path: 'branches',component: AdminBranchesComponent},
  { path: 'chitids', component: AdminChitidsComponent},
  { path: 'userchits', component: UserChitsComponent},
  { path: 'admin/**', redirectTo: 'chits', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
	  AdminChitsComponent,
	  AdminBranchesComponent,
    AdminChitidsComponent,
    UserChitsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    CommonModule,
    RouterModule.forChild(appAdminRoutes)
  ],
  providers: [BranchService,ChitsService,ChitIdService,UserChitsService],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
