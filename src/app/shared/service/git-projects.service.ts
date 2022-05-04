import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GitProjectsService {

  endpointApi = environment.urlApi;

  constructor(private http: HttpClient) { }

  listProjects(){
    return this.http.get<any>(`${this.endpointApi}/projects`);
  }

  saveProject(body){
    return this.http.post<any>(`${this.endpointApi}/projects`, body);
  }

  getProjectById(gitUser, repoName){
  
    return this.http.get<any>(`${this.endpointApi}/projects/${gitUser}/${repoName}`,{responseType: 'blob' as 'json'});
  }
    
}
