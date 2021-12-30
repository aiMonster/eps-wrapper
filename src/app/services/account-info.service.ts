import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountInfoService {

  constructor(private httpClient: HttpClient) { }

  getMetersHistory(accountId: string, dateFrom: Date, dateTo: Date): Observable<string> {
    const history_url =`/api/ternopil/account/view_meters_history/${accountId}`;
    
    const formData = new FormData();
    formData.append('date_from', this.formatDate(dateFrom));
    formData.append('date_to', this.formatDate(dateTo));

    return this.httpClient.post<string>(history_url, formData)
  }

  getCurrentMeters(accountId: string): Observable<string> {
    const url = `/api/ternopil/account/view/${accountId}`;
    return this.httpClient.get<string>(url);
  }

  private formatDate(date: Date): string {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }
}
