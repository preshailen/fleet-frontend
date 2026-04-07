import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';
import { leaveGuard } from '../../core/guards/leave.guard';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [roleGuard],
    children: [
      {
        data: { roles: ['ADMIN', 'USER'] },
        path: 'create-requisition',
        canDeactivate: [leaveGuard],
        loadComponent: () => import('./create-requisition/create-requisition').then((c) => c.CreateRequisition)
      },
      {
        data: { roles: ['SUPPLIER'] },
        path: 'fulfill-requisition',
        loadComponent: () => import('./fulfill-requisitions/fulfill-requisitions').then(k =>k.FulfillRequisitions)
      },
      {
        data: { roles: ['ADMIN', 'USER'] },
        path: 'view-quotes',
        loadComponent: () => import('./view-quotes/view-quotes').then(o => o.ViewQuotes)
      },
      {
        path: 'approvals',
        children: [
          {
            path: 'cost-centre',
            loadComponent: () => import('./approvals/cost-centre-approval/cost-centre-approval').then(c => c.CostCentreApproval)
          },
          {
            path: 'finance',
            loadComponent: () => import('./approvals/finance-approval/finance-approval').then(c => c.FinanceApproval)
          },
          {
            path: 'delegated',
            loadComponent: () => import('./approvals/delegated-approval/delegated-approval').then(c => c.DelegatedApproval)
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisitionRoutingModule {}
