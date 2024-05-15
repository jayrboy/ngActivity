import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { authGuard } from './route/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'home', title: 'Page Not Found' },
];
