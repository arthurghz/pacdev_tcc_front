import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../shared/auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            { path: 'history', loadChildren: () => import('./history-projects/history-projects.module').then(m => m.HistoryProjectsModule) },
            { path: 'list-projects', loadChildren: () => import('./list-projects/list-projects.module').then(m => m.ListProjectsModule) },  
        ],
        canActivate:[],
    },

    
    {path: '**', redirectTo: 'home'}
]