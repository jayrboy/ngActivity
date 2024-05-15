import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Project from '../models/project.model';
import Response from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // properties

  // constructor
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:8000/api/Project';

  // methods
  getAll() {
    return this.http.get<Response>(`${this.baseURL}`);
  }

  getById() {}

  post() {}

  put(project: Project) {}

  deleteById() {}
}
