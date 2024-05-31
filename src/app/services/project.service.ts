import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Project from '../models/project.model';
import Response from '../models/response.model';
import Activity from '../models/activity.model';
import FileModel from '../models/file.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // properties
  token: string | null = localStorage.getItem('token');

  // constructor
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:8000/api/Project';

  // methods
  getAll() {
    return this.http.get<Response>(`${this.baseURL}`);
  }

  getById(id: number | string) {
    return this.http.get<Response>(`${this.baseURL}/${id}`);
  }

  post(project: Project) {
    return this.http.post<Project>(`${this.baseURL}`, project);
  }

  put(project: Project) {
    return this.http.put<Project>(`${this.baseURL}`, project);
  }

  delete(id: number | string) {
    return this.http.delete<Project>(`${this.baseURL}/${id}`);
  }

  postFormData(project: Project, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('projectCreate', JSON.stringify(project));
    files.map((f, index) => {
      formData.append('fromFile', f, f.name);
    });

    return this.http.post(this.baseURL, formData);
  }

  putFormData(project: Project, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('project', JSON.stringify(project));
    files.forEach((f) => {
      formData.append('formFile', f, f.name);
    });

    return this.http.put(this.baseURL, formData);
  }

  download(file: File) {
    return this.baseURL + '/download/' + file.name;
  }

  downloadV2(id: any) {
    return 'http://localhost:800/api/File/download/' + id;
  }
}
