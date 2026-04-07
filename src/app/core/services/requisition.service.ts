import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Requisition } from '../models/requisition/requisition.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequisitionService {
  private apiUrl = `${environment.apiUrl}/api/requisition`;
  private http = inject(HttpClient);

  getRequisitions(params: any): Observable<any[]> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get<any[]>(`${this.apiUrl}/getRequisitions`, { params: httpParams });
  }
  getAttachedQuotes(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAttachedQuotes/${id}`);
  }
  getRequisitionSpecificationById(id: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/getRequisitionSpecificationById/${id}`);
  }
  getSignedPdfUrl(url: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/getSignedPdfUrl/${url}`)
  }
  getSupplierLeadTime(params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get<any>(`${this.apiUrl}/getSupplierLeadTime`, { params: httpParams });
  }
  updateRequisitionStatus(id: string | null, status: string | null): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/updateRequisitionStatus/${id}/${status}`, {});
  }
  rejectRequisition(id: string | null) {
    return this.http.post<boolean>(`${this.apiUrl}/rejectRequisition/${id}`, {});
  }
  createRequisition(requisition: Requisition): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createRequisition`, requisition);
  }
  fulfillRequisition(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/fulfillRequisition`, data)
  }
  selectPreferredQuote(requisitionId: string | null, quoteId: string | null): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/selectPreferredQuote/${requisitionId}/${quoteId}`, {})
  }
}
