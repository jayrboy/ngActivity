import { MatIconModule } from '@angular/material/icon';
import Project from '../../models/project.model';
import Response from '../../models/response';
import { ProjectService } from './../../services/project.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  AllProjects: any = new Project();

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getAll().subscribe(
      (result: Response) => {
        console.log(result);
        this.AllProjects = result.data;
      },
      (error) => console.error(error)
    );
  }

  onSortId() {}
}
