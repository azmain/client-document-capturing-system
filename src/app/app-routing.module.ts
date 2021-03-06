import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { from } from 'rxjs';

import { NotFoundComponent } from '@module/shared/not-found/not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: 'documents',
        loadChildren: '@module/document/document.module#DocumentModule'
    },
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },
    {
        path: '',
        redirectTo: '/**',
        pathMatch: 'full'
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}