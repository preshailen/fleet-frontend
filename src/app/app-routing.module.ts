// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/analytics',
        pathMatch: 'full'
      },
      {
        path: 'analytics',
        loadComponent: () => import('./demo/dashboard/dash-analytics.component').then((c) => c.DashAnalyticsComponent)
      },
      {
        path: 'requisition',
        loadChildren: () => import('./features/requisition/requisition.module').then(d => d.RequisitionModule)
      },
      {
        path: 'vehicle-records',
        loadChildren: () => import('./features/vehicle-records/vehicle-records.module').then(k => k.VehicleRecordsModule)
      },
      {
        path: 'reporting',
        loadChildren: () => import('./features/reporting/reporting.module').then(k => k.ReportingModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'chart',
        loadComponent: () => import('./demo/chart-maps/core-apex.component').then((c) => c.CoreApexComponent)
      },
      {
        path: 'forms',
        loadComponent: () => import('./demo/forms/form-elements/form-elements.component').then((c) => c.FormElementsComponent)
      },
      {
        path: 'tables',
        loadComponent: () => import('./demo/tables/tbl-bootstrap/tbl-bootstrap.component').then((c) => c.TblBootstrapComponent)
      }
    ]
  },
  {
    path: 'auth',
    component: GuestComponent,
    children: [
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then((c) => c.Register)
      },
      {
        path: 'supplier-register',
        loadComponent: () => import('./features/auth/supplier-register/supplier-register').then((i) => i.SupplierRegister)
      },
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then((c) => c.Login)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'analytics'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
