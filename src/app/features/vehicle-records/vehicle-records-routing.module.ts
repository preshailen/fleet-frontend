import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'master-record',
        loadComponent: () => import('./master-record/master-record').then((c) => c.MasterRecord)
      },
      {
        path: 'create-record',
        children: [
          {
            path: 'upload', 
            loadComponent: () => import('./create-record/upload-record/upload-record').then((c) => c.UploadRecord)
          },
          {
            path: 'capture',
            loadComponent: () => import('./create-record/capture-record/capture-record').then((c) => c.CaptureRecord)
          }
        ]
      },
      {
        path: 'record-reporting',
        children: [
          {
            path: 'size-reporting',
            loadComponent: () => import('./reporting/size-reporting/size-reporting').then((d) => d.SizeReporting)
          },
          {
            path: 'spend-reporting',
            loadComponent: () => import('./reporting/spend-reporting/spend-reporting').then((k) => k.SpendReporting)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRecordsRoutingModule {}
