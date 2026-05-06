import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'fleet-size',
        loadComponent: () => import('./fleet-size/fleet-size').then((c) => c.FleetSize)
      },
      {
        path: 'fleet-spend',
        loadComponent: () => import('./fleet-spend/fleet-spend').then((c) => c.FleetSpend)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule {}
