import { Component, Inject, ViewChild } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
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
import { Router } from '@angular/router';

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

  file_name: string = '';
  // file: File | null = null;
  file: File[] = []; // Change to an array to store multiple files
  file_url: string = '';
  show_url: string = '';

  @ViewChild('projectForm') form!: NgForm;

  constructor(
    public dialogRef: MatDialogRef<ProjectCreateComponent>,
    private _projectService: ProjectService,
    private _toastr: ToastrService,
    private _router: Router,
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

  //TODO:
  uploading(event: any): void {
    let files: FileList = event.target.files; // Get the file list
    this.file = Array.from(files); // Convert FileList to an array

    if (files.length > 5) {
      this._toastr.warning('กรุณาเพิ่มไฟล์ได้ไม่เกินครั้งละ 5 ไฟล์');
      this.file_name = '';
      this.file = [];
      event.target.value = null;
    } else {
      this.file.map((f, i) => {
        if (f.size > 100 * 1024) {
          this.file_name = '';
          this._toastr.warning('ขนาดไฟล์ของไฟล์ต้องไม่เกิน 100 KB');
          this.file = [];
          event.target.value = null;
        }
      });
    }

    if (files.length > 0) {
      this.show_url = URL.createObjectURL(files[0]); // Show URL for the first file as an example
      this.file_name = files[0].name; // Show name of the first file as an example
    }
  }

  onSubmitCreate() {
    // console.log(this.project);
    // console.log(this.file);
    if (this.form.valid) {
      this._projectService.postFormData(this.project, this.file).subscribe(
        (result: Response) => {
          // console.log(result.data);

          if (this.file.length > 0) {
            // Assuming `download` method can handle an array of files
            this.file.map((f) => {
              const fileUrl = this._projectService.download(f);
            });
          }
          this._router.navigate(['/']).then(() =>
            this._router.navigate(['/project']).then(() => {
              this._toastr.success('เพิ่มข้อมูลสำเร็จ');
              this.dialogRef.close();
            })
          );
        },
        (error) => this._toastr.error(error.message)
      );
    }
  }
}
