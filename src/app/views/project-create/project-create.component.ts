import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { ProjectService } from '../../services/project.service';
import Project from '../../models/project.model';
import Activity from './../../models/activity.model';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css',
})
export class ProjectCreateComponent {
  project = new Project();
  newActivityName: string = '';
  subActivityName: string = '';

  constructor(
    public dialogRef: MatDialogRef<ProjectCreateComponent>,
    private projectService: ProjectService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {}

  toggleNewActivityField() {
    this.newActivityName = this.newActivityName ? '' : this.newActivityName;
  }

  addActivity() {
    if (this.newActivityName.trim() !== '') {
      const newActivity: Activity = {
        id: 0,
        projectId: 0,
        activityHeaderID: 0,
        name: this.newActivityName,
        createDate: new Date(),
        updateDate: new Date(),
        isDelete: false,
        activityHeader: null,
        inverseActivityHeader: [],
        project: new Project(),
      };

      this.project.activities.push(newActivity);
      this.newActivityName = ''; // Clear the input field after adding activity
    }
  }

  addSubActivity(activity: Activity) {
    if (this.newActivityName.trim() !== '') {
      const subActivity: Activity = {
        id: 0,
        projectId: activity.projectId,
        activityHeaderID: activity.id,
        name: this.newActivityName,
        createDate: new Date(),
        updateDate: new Date(),
        isDelete: false,
        activityHeader: null,
        inverseActivityHeader: [],
        project: new Project(),
      };

      if (!activity.inverseActivityHeader) {
        activity.inverseActivityHeader = [];
      }

      activity.inverseActivityHeader.push(subActivity);
      this.newActivityName = ''; // Clear the input field after adding sub-activity
    }
  }

  removeSubActivity(activity: Activity[], index: number) {
    activity.splice(index, 1);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmitCreate() {
    console.log(this.project);

    this.projectService.post(this.project).subscribe(
      (result) => {
        console.log(result);
        window.location.reload();
        this.toastr.success('เพิ่มสำเร็จ');
      },
      (error) => this.toastr.error(error.message)
    );
  }
}
