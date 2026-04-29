import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        /*
          data: { roles: ['ADMIN'] },
          canActivate: [roleGuard],
        */
        path: 'master-record',
        loadComponent: () => import('./master-record/master-record').then((c) => c.MasterRecord)
      },
      {
        path: 'create-record',
        children: [
          {
            /*
              data: { roles: ['ADMIN'] },
              canActivate: [roleGuard],
            */
            path: 'upload',
            
            loadComponent: () => import('./create-record/upload-record/upload-record').then((c) => c.UploadRecord)
          },
          {
            /*
              data: { roles: ['ADMIN'] },
              canActivate: [roleGuard],
            */
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
