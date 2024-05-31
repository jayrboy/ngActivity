import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import Project from '../../models/project.model';
import Response from '../../models/response.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import Activity from '../../models/activity.model';
import FileModel from '../../models/file.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

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
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './project-manage.component.html',
  styleUrl: './project-manage.component.css',
})
export class ProjectManageComponent {
  projectId = -1;
  project = new Project();

  file: File[] = []; // Change to an array to store multiple files
  file_name: string = '';

  showFiles: FileModel[] = [];
  file_list: File[] = [];

  @ViewChild('projectForm') form!: NgForm;

  constructor(
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
    private _toastr: ToastrService,
    private _router: Router
  ) {
    this.projectId = Number(this._route.snapshot.params['id']);
    this._projectService.getById(this.projectId).subscribe(
      (result: Response) => {
        // console.log(result.data);

        this.project = result.data;
        this.showFiles = result.data.file;
      },
      (error) => {
        this._toastr.error(error);
      }
    );
  }

  addActivity() {
    const newActivity: Activity = {
      id: 0,
      projectId: 0,
      activityHeaderId: 0,
      name: '',
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      isDelete: false,
      activityHeader: null,
      inverseActivityHeader: [],
      project: new Project(),
    };

    this.project.activities.push(newActivity);
  }

  addSubActivity(activity: Activity) {
    const subActivity: Activity = {
      id: 0,
      projectId: activity.projectId,
      activityHeaderId: activity.id,
      name: '',
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      isDelete: false,
      activityHeader: null,
      inverseActivityHeader: [],
      project: new Project(),
    };

    activity.inverseActivityHeader.push(subActivity);
  }

  // remove this is a activity
  removeSubActivity(activity: Activity): void {
    // console.log('Deleted :', activity.name);

    activity.isDelete = true;

    activity.inverseActivityHeader.map((act) => {
      act.isDelete = true;

      if (act.inverseActivityHeader != null) {
        act.inverseActivityHeader.map((sub) => this.removeSubActivity(sub));
      }
    });
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

  onSubmit() {
    // console.log(this.project);
    // console.log(this.file_list);

    if (this.form.valid) {
      this._projectService.putFormData(this.project, this.file_list).subscribe(
        (result: Response) => {
          // console.log(result.data);

          this._router.navigate(['/']).then(() => {
            this._router.navigate(['/project/manage', this.projectId]);
            this._toastr.success('อัปเดตข้อมูลสำเร็จ');
          });
        },
        (error) => {
          this._toastr.error(error.message);
        }
      );
    }
  }

  onIsDelete(id: number) {
    const confirmDelete = confirm('ยืนยันลบรายการนี้?');

    if (confirmDelete) {
      this._projectService.deleteFile(id).subscribe(
        (result) => {
          // console.log(result);

          this._toastr.success('ลบข้อมูล สำเร็จ');
          window.location.reload();
        },
        (error) => {
          this._toastr.error(error.message);
        }
      );
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index; // แต่ละกิจกรรมมี id ที่ไม่ซ้ำกัน
  }
}
