import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// services
import { AuthenticationService } from './_services/authentication.service';
import { GetDataService } from './_services/getdata.service';
import { IsLoginService } from './_services/login.service';
import { ChitsService } from './_services/getchitsdata.service';
import { LoaderService } from './_services/loader.service';
import { CommonService } from './_services/common.service';


// non auth components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { WorksComponent } from './works/works.component';
import { JoinComponent } from './join/join.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

// auth components. This will be moved to separate module soon
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { UserComponent } from './user/user.component';
import { FooterComponent } from './footer/footer.component';
import { UserChitsComponent } from './user/chits/chits.component';
import { TransactionComponent } from './user/transaction/transaction.component';
import { ProfileComponent } from './user/profile/profile.component';

import { OnlyNumber } from './_directives/onlynumber.directive';

const appGlobalRoutes: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

const appRoutes: Routes = [
  { path: '', children:[
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '' , component: HeaderComponent, outlet: 'header'},
      { path: '', component: FooterComponent, outlet:'footer' },
      { path: 'home', component: HomeComponent },
      { path: 'howitworks', component: WorksComponent },
      { path: 'joinus', component: JoinComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'contactUs', component: ContactComponent },
      { path: 'aboutUs', component: AboutComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  { loadChildren: 'app/admin/admin.module#AdminModule', path: 'admin' },
];
const appUserRoutes: Routes = [
  { path: 'user', children:[
      { path: '', children:[
      { path: '', component: UserChitsComponent },
      { path: '', component: DashboardComponent, outlet:'header' },
      { path: '', component: FooterComponent, outlet:'footer' },
      { path: 'howitwork', component: WorksComponent },
      { path: 'group', component: GroupsComponent },
      { path: 'chits', component: UserChitsComponent },
      { path: 'transactions', component: TransactionComponent },
      { path: 'profile', component: ProfileComponent }
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
    DashboardComponent,
    FieldErrorDisplayComponent,
    UserComponent,
    FooterComponent,
    UserChitsComponent,
    TransactionComponent,
    ProfileComponent,
    OnlyNumber
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
  providers: [AuthenticationService, GetDataService, IsLoginService, ChitsService, LoaderService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
