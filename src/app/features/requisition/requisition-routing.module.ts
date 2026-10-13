import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';
import { leaveGuard } from '../../core/guards/leave.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        data: { roles: ['ADMIN', 'USER'] },
        path: 'create-requisition',
        canDeactivate: [leaveGuard],
        canActivate: [roleGuard],
        loadComponent: () => import('./create-requisition/create-requisition').then((c) => c.CreateRequisition)
      },
      {
        data: { roles: ['SUPPLIER'] },
        path: 'fulfill-requisition',
        canActivate: [roleGuard],
        loadComponent: () => import('./fulfill-requisitions/fulfill-requisitions').then(k =>k.FulfillRequisitions)
      },
      {
        data: { roles: ['ADMIN', 'USER'] },
        path: 'view-quotes',
        canActivate: [roleGuard],
        loadComponent: () => import('./view-quotes/view-quotes').then(o => o.ViewQuotes)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisitionRoutingModule {}
