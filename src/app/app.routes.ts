import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {MsalGuard} from '@azure/msal-angular';
import {LoginFailedComponent} from './login-failed/login-failed.component';
import {AppComponent} from './app.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'landing',
    component: AppComponent
  },
  {
    path: 'login-failed',
    component: LoginFailedComponent
  }
];
