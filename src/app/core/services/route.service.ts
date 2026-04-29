import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private router = inject(Router);

  goToMasterRecord() {
    this.router.navigate(['/vehicle-records/master-record']);
  }
  goToAnalytics() {
    this.router.navigate(['/analytics']);
  }
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
  
}
