import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { authGuard } from './route/auth.guard';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { ProjectComponent } from './views/project/project.component';
import { ProjectCreateComponent } from './views/project-create/project-create.component';
import { ProjectManageComponent } from './views/project-manage/project-manage.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [authGuard],
  },
  {
    path: 'project',
    component: ProjectComponent,
    title: 'Project View',
    canActivate: [authGuard],
  },
  {
    path: 'project/create',
    component: ProjectCreateComponent,
    title: 'Project Create',
    canActivate: [authGuard],
  },
  {
    path: 'project/manage/:id',
    component: ProjectManageComponent,
    title: 'Project Management',
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
