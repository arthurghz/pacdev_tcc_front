import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpointApi = environment.urlApi;

  constructor(private http: HttpClient) { }

  
  getAccount(email, password): Observable<any>{
    return this.http.get<any>(`${this.endpointApi}/account?email=${email}&password=${password}`)
  }

}

