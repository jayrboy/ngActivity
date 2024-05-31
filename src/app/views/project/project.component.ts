import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import Project from '../../models/project.model';
import Response from '../../models/response.model';
import { ProjectService } from './../../services/project.service';

import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './project.component.html',
})
export class ProjectComponent {
  AllProjects: Project[] = [];
  project = new Project();
  role = localStorage.getItem('role');

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
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

  //? Use with: "public dialog: MatDialog" in constructor(...)
  // openDialogCreate() {
  //   const dialogRef = this.dialog.open(ProjectCreateComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //   });
  // }

  onClickDelete(projectId: number) {
    const confirmDelete = confirm('ยืนยันลบรายการนี้?');
    if (confirmDelete) {
      this.projectService.delete(projectId).subscribe(
        (result) => {
          this.AllProjects = this.AllProjects.filter((p) => p.id !== projectId);
          window.location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
