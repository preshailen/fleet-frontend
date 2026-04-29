import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private url = 'assets/data';

  getEngineSizes() {
    return this.http.get<string[]>(`${this.url}/engine-size.json`);
  }
  getFuelTypes() {
    return this.http.get<string[]>(`${this.url}/fuel-type.json`);
  }
  getTransmissionTypes() {
    return this.http.get<string[]>(`${this.url}/transmission.json`);
  }
  getLimitValues() {
    return this.http.get<string[]>(`${this.url}/limit-values.json`);
  }
}
