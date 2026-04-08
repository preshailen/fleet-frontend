import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { LoginModel, RegisterModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  private accessToken = signal<string | null>(null);
  private currentUser = signal<User | null>(null);
  private http = inject(HttpClient);
  
  register(model: RegisterModel): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, model);
  }

  login(model: LoginModel) {
    return this.http.post<any>(`${this.apiUrl}/login`, model).pipe(tap(res => {
      this.accessToken.set(res.accessToken);
      this.currentUser.set(res.user);
    }));
  }

  refreshToken() {
    return this.http.post<any>(`${this.apiUrl}/refresh`, {}, { withCredentials: true }).pipe(tap(res => {
      this.accessToken.set(res.accessToken);
      this.currentUser.set(res.user);
    }));
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(tap((res) => {
      this.accessToken.set(null);
      this.currentUser.set(null);
    }));
  }

  getAccessToken() {
    return this.accessToken();
  }
  setAccessToken(token: string) {
    this.accessToken.set(token);
  }
  getUser() {
    return this.currentUser();
  }
  setUser(user: User) {
    this.currentUser.set(user);
  }
  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  hasRole(role: string): boolean {
    return this.currentUser()?.roles?.includes(role) ?? false;
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(r => this.currentUser()?.roles?.includes(r));
  }
  
}
