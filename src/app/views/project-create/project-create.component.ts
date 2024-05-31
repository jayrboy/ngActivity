import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { ProjectService } from '../../services/project.service';
import Project from '../../models/project.model';
import Activity from './../../models/activity.model';

import { ToastrService } from 'ngx-toastr';
import Response from '../../models/response.model';
import { Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css',
})
export class ProjectCreateComponent {
  project = new Project();
  newActivityName: string = '';
  subActivityName: string = '';
  file_name: string = '';

  file_list: File[] = [];
  file: File[] = []; // Change to an array to store multiple files
  file_url: string = '';

  @ViewChild('projectForm') form!: NgForm;

  constructor(
    private _projectService: ProjectService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  addActivity() {
    const newActivity: Activity = {
      id: 0,
      projectId: 0,
      activityHeaderId: 0,
      name: this.newActivityName,
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      isDelete: false,
      activityHeader: null,
      inverseActivityHeader: [],
      project: new Project(),
    };

    this.project.activities.push(newActivity);
    this.newActivityName = '';
  }

  addSubActivity(activity: Activity) {
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

  removeSubActivity(activity: Activity[], index: number) {
    activity.splice(index, 1);
  }

  //TODO:
  uploading(event: any): void {
    let files: FileList = event.target.files; // Get the file list
    this.file = Array.from(files); // Convert FileList to an array

    this.file.forEach((f) => {
      // 1024 KiloBytes == 1 MegaBytes
      if (f.size > 100 * 1024) {
        event.target.value = null;
        this.file_list = [];
        this.file_name = '';
        this._toastr.warning('ขนาดไฟล์ของไฟล์ต้องไม่เกิน 100 MB');
      } else {
        this.file_list.push(f);
      }
    });

    if (files.length > 5) {
      this._toastr.warning('กรุณาเพิ่มไฟล์ได้ไม่เกินครั้งละ 5 ไฟล์');
      this.file_name = '';
      this.file_list = [];
      event.target.value = null;
    } else if (this.file_list.length > 5) {
      event.target.value = null;
      this.file_list = [];
      this._toastr.warning('กรุณาเพิ่มไฟล์ได้ไม่เกิน 5 ไฟล์');
    } else if (files.length > 0) {
      this.file_name = files[0].name; // Show name of the first file as an example
    }
  }

  onSubmitCreate() {
    // console.log(this.project);
    // console.log(this.file_list);

    if (this.form.valid) {
      this._projectService.postFormData(this.project, this.file_list).subscribe(
        (result: Response) => {
          // console.log(result.data);

          this._router.navigate(['/']).then(() =>
            this._router.navigate(['/project']).then(() => {
              this._toastr.success('เพิ่มข้อมูลสำเร็จ');
            })
          );
        },
        (error) => this._toastr.error(error.message)
      );
    }
  }
}
