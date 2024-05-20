import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import Project from '../../models/project.model';
import Response from '../../models/response.model';
import { ProjectService } from './../../services/project.service';

import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { ProjectCreateComponent } from '../project-create/project-create.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './project.component.html',
})
export class ProjectComponent {
  AllProjects: Project[] = [];
  project = new Project();

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectService.getAll().subscribe(
      (result: Response) => {
        // console.log(result);
        this.AllProjects = result.data;
      },
      (error) => this.toastr.error(error, 'Project not found')
    );
  }

  openDialogCreate() {
    const dialogRef = this.dialog.open(ProjectCreateComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
