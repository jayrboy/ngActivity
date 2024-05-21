import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import Project from '../../models/project.model';
import Response from '../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import Activity from '../../models/activity.model';

@Component({
  selector: 'app-project-manage',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule,
  ],
  templateUrl: './project-manage.component.html',
  styleUrl: './project-manage.component.css',
})
export class ProjectManageComponent {
  projectId = -1;
  project = new Project();
  newActivityName = '';

  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
    private _toastr: ToastrService
  ) {
    this.projectId = Number(this._route.snapshot.params['id']);
    this._projectService.getById(this.projectId).subscribe(
      (result: Response) => {
        // console.log(result);
        this.project = result.data;
      },
      (error) => {
        this._toastr.error(error);
      }
    );
  }

  toggleNewActivityField() {
    this.newActivityName = this.newActivityName ? '' : this.newActivityName;
  }

  addActivity() {
    if (this.newActivityName.trim() !== '') {
      const newActivity: Activity = {
        id: 0,
        projectId: 0,
        activityHeaderId: 0,
        name: this.newActivityName,
        createDate: new Date().toString(),
        updateDate: new Date().toString(),
        isDelete: false,
        activityHeader: null,
        inverseActivityHeader: [],
        project: new Project(),
      };

      this.project.activities.push(newActivity);
      this.newActivityName = '';
    }
  }

  addSubActivity(activity: Activity) {
    if (this.newActivityName.trim() !== '') {
      const subActivity: Activity = {
        id: 0,
        projectId: activity.projectId,
        activityHeaderId: activity.id,
        name: this.newActivityName,
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString(),
        isDelete: false,
        activityHeader: null,
        inverseActivityHeader: [],
        project: new Project(),
      };

      if (!activity.inverseActivityHeader) {
        activity.inverseActivityHeader = [];
      }

      activity.inverseActivityHeader.push(subActivity);
      this.newActivityName = '';
    }
  }

  removeSubActivity(activity: Activity[], index: number) {
    activity.splice(index, 1);
  }

  onSubmit() {
    console.log('Before : ', this.project);

    this._projectService.put(this.project).subscribe(
      (result: Project) => {
        console.log('After : ', result);
        this._toastr.success('แก้ไขสำเร็จ');
      },
      (error) => this._toastr.error(error.message)
    );
  }
}
