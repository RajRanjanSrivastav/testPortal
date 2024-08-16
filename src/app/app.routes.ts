import { Routes } from '@angular/router';
import { NgoDashboardComponent } from './views/ngo-dashboard/ngo-dashboard.component';
import { NdmaFormComponent } from './views/ndma-form/ndma-form.component';


export const routes: Routes = [
    { path: 'hrForm', component: NdmaFormComponent },
    { path: '', component: NdmaFormComponent },
    { path: 'ngoDashboard', component: NgoDashboardComponent },
];
