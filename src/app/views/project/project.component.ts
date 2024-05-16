import { MatIconModule } from '@angular/material/icon';
import Project from '../../models/project.model';
import Response from '../../models/response.model';
import { ProjectService } from './../../services/project.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  AllProjects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getAll().subscribe(
      (result: Response) => {
        // console.log(result);
        this.AllProjects = result.data;
      },
      (error) => console.error(error)
    );
  }

  onSortId() {}
}
