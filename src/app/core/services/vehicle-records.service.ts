import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleRecordsService {
  private apiUrl = `${environment.apiUrl}/api/vehicle-records`;
  private http = inject(HttpClient);

  uploadVehicleRecords(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/upload-records`, data);
  }

  getRecords(params: any): Observable<any[]> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get<any[]>(`${this.apiUrl}/get-records`, { params: httpParams });
  }
}
