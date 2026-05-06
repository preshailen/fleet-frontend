import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'master-record',
        loadComponent: () => import('./master-record/master-record').then((c) => c.MasterRecord)
      },
      {
        path: 'testing-master-record',
        loadComponent: () => import('./testing-master-record/testing-master-record').then((d) => d.TestingMasterRecord)
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRecordsRoutingModule {}
