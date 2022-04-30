import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagamentosService {

  endpointApi = environment.urlApi;

  constructor(private http: HttpClient) { }

  listPayments(page, limit): Observable<any>{
    return this.http.get<any>(`${this.endpointApi}/tasks?_page=${page}&_limit=${limit}`, {observe: 'response'});
  }

  filterPayments(filter):Observable<any>{
    return this.http.get<any>(`${this.endpointApi}/tasks?name=${filter}`);
  }

  savePayment(body): Observable<any>{
    return this.http.post<any>(`${this.endpointApi}/tasks`, body);
  }

  deletePayment(id):Observable<any>{
    return this.http.delete<any>(`${this.endpointApi}/tasks/${id}`, {observe: 'response'});
  }




}
