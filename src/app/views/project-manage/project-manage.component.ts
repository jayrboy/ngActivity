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
      const newActivity: any = {
        name: this.newActivityName,
        inverseActivityHeader: [],
      };

      this.project.activities.push(newActivity);
      this.newActivityName = '';
    }
  }

  addSubActivity(activity: Activity) {
    if (this.newActivityName.trim() !== '') {
      const subActivity: any = {
        name: this.newActivityName,
        inverseActivityHeader: [],
      };

      activity.inverseActivityHeader.push(subActivity);
      this.newActivityName = '';
    }
  }

  //TODO:
  onSubmit() {
    // console.log('Before:', this.project.activities);

    this._projectService.put(this.project).subscribe(
      (result) => {
        // console.log('After:', result);
        this._toastr.success('แก้ไขสำเร็จ');
      },
      (error) => this._toastr.error(error.message)
    );
  }

  // remove this is a activity
  removeSubActivity(activity: Activity[], index: number) {
    // console.log('remove :', activity[index].name);
    let activityId = activity[index].id;

    this._projectService.deleteActivity(activityId).subscribe(
      (result) => {
        this._toastr.success('Deleted :' + result.name);
      },
      (err) => this._toastr.error(err)
    );

    activity.splice(index, 1);
  }
}
