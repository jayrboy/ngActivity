import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Project from '../models/project.model';
import Response from '../models/response.model';
import Activity from '../models/activity.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // properties

  // constructor
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:8000/api/Project';
  readonly baseURL2 = 'http://localhost:8000/api/Activity';

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

  deleteActivity(id: number | string) {
    return this.http.delete<Activity>(`${this.baseURL2}/${id}`);
  }
}
