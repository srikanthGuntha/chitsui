import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { WorksComponent } from './works/works.component';
import { JoinComponent } from './join/join.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/header/header.component';
import { AdminChitsComponent } from './admin/chits/chits.component';
import { AdminBranchesComponent } from './admin/branches/branches.component';
import { ChitsService } from './chits.service';

import { AuthenticationService } from './_services/authentication.service';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { UserComponent } from './user/user.component';
import { FooterComponent } from './footer/footer.component';
import { UserChitsComponent } from './user/chits/chits.component';


const appGlobalRoutes: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

const appRoutes: Routes = [
  { path: '', children:[
      { path: '', component: HomeComponent },
      { path: '' , component: HeaderComponent, outlet: 'header'},
      { path: 'howitworks', component: WorksComponent },
      { path: 'joinus', component: JoinComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'contactUs', component: ContactComponent },
      { path: 'aboutUs', component: AboutComponent },
      { path: 'login', component: LoginComponent }
  ]}
];

const appAdminRoutes: Routes = [
  { path: 'admin', children:[
      { path: '', children:[
      { path: '', component: AdminComponent },
      { path: '', redirectTo: 'chits', pathMatch: 'full' },
      { path: '', component: AdminHeaderComponent, outlet:'header' },
      { path: 'chits', component: AdminChitsComponent},
      { path: 'branches', component: AdminBranchesComponent}
      ]}
  ]}
];

const appUserRoutes: Routes = [
  { path: 'user', children:[
      { path: '', children:[
      { path: '', component: UserComponent },
      { path: '', redirectTo: 'chits', pathMatch: 'full' },
      { path: '', component: DashboardComponent, outlet:'header' },
      { path: '', component: FooterComponent, outlet:'footer' },
      { path: 'howitworks', component: WorksComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'chits', component: UserChitsComponent },
      { path: 'branches', component: UserChitsComponent }
      ]}
  ]}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    WorksComponent,
    JoinComponent,
    LoginComponent,
    GroupsComponent,
    ContactComponent,
    AboutComponent,
    AdminComponent,
    AdminHeaderComponent,
    AdminChitsComponent,
    AdminBranchesComponent,
    DashboardComponent,
    FieldErrorDisplayComponent,
    UserComponent,
    FooterComponent,
    UserChitsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    RouterModule.forRoot(
      appRoutes,
      {
        useHash: true
      }
    ),
    RouterModule.forRoot(
      appAdminRoutes,
      {
        useHash: true
      }
    ),
    RouterModule.forRoot(
      appUserRoutes,
      {
        useHash: true
      }
    ),
    RouterModule.forRoot(
      appGlobalRoutes,
      {
        useHash: true
      }

    )
  ],
  providers: [ChitsService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
