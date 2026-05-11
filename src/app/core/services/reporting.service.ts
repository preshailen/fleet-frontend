import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportingService {
  private apiUrl = `${environment.apiUrl}/api/reporting`;
  private http = inject(HttpClient);
  
  getTotals() {
    return this.http.get<any>(`${this.apiUrl}/get-totals`);
  }
}
