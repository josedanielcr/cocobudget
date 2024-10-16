import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {MsalGuard} from '@azure/msal-angular';
import {LoginFailedComponent} from './login-failed/login-failed.component';
import {AppComponent} from './app.component';
import {BudgetComponent} from './pages/budget/budget.component';
import {SetupComponent} from './pages/setup/setup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [MsalGuard],
    children: [
      {
        path : '',
        redirectTo: 'budget',
        pathMatch: 'full'
      },
      {
        path : 'budget',
        component: BudgetComponent
      },
      {
        path : 'setup',
        component: SetupComponent
      }
    ]
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
