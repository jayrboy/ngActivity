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
    const maxSize: number = 100; // สมมุติ ต้องการจำกัดไฟล์ขนาดไฟล์ไม่เกิน 100 KB
    const maxFiles: number = 5; // จำกัดจำนวนไฟล์ไม่เกิน 5 ไฟล์

    // ตรวจสอบจำนวนไฟล์รวมที่อัปโหลดว่ามากกว่า maxFiles หรือไม่
    if (
      this.project.file.length + this.file_list.length + files.length >
      maxFiles
    ) {
      this._toastr.warning('เพิ่มไฟล์ได้ไม่เกิน 5 ไฟล์');
      return;
    }

    // ตรวจสอบขนาดของแต่ละไฟล์ที่อัปโหลด
    for (let i = 0; i <= files.length - 1; i++) {
      if (files[i].size > maxSize * 1024) {
        this._toastr.warning(`ขนาดของไฟล์ต้องไม่เกิน ${maxSize} KB`);
        return;
      }
    }

    // เพิ่มไฟล์ที่ผ่านการตรวจสอบแล้วเข้ามาใน list
    for (let i = 0; i <= files.length - 1; i++) {
      this.file_list.push(files[i]);
    }

    // อัปเดตชื่อไฟล์ใน input
    if (files.length > 0) {
      this.file_name = Array.from(files)
        .map((file) => file.name)
        .join(', ');
    }

    // รีเซ็ต input value เพื่อให้สามารถเลือกไฟล์ซ้ำได้
    event.target.value = '';
  }

  onSubmit() {
    // console.log(this.project);
    // console.log(this.file_list);

    if (this.form.valid) {
      this._projectService.putFormData(this.project, this.file_list).subscribe(
        (result: Response) => {
          this._router.navigate(['/']).then(() => {
            this._router.navigate(['/project/manage', this.projectId]);
            this._toastr.success('อัปเดตข้อมูลสำเร็จ');
          });
        },
        (error) => {
          this._toastr.error(error.message);
        }
      );
    } else {
      this._toastr.warning('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }

  onIsDelete(file: FileModel) {
    // console.log(file);
    const confirmDelete = confirm('ยืนยันลบไฟล์ที่มีอยู่นี้?');
    if (confirmDelete) {
      file.isDelete = true;
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index; // แต่ละกิจกรรมมี id ที่ไม่ซ้ำกัน
  }

  onRemove(index: number) {
    this.file_list.splice(index, 1);
  }

  onChangeInputInvalid(event: any): void {
    console.log(event);
  }
}
