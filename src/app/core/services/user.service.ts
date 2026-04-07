import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/user';
  private http = inject(HttpClient);

  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getSuppliers`);
  }
}
