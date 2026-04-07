import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:5000/api/email';
  
  private http = inject(HttpClient);
  
  sendEmail(email: string) {
    return this.http.post<any>(`${this.apiUrl}/send-email`, { email });
  }
}
