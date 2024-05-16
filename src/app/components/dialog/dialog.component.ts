import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onCloseDialog() {
    this.dialog.closeAll();
  }

  onClickLogOut() {
    this.authService.clearToken();
    this.router.navigate(['/login']);
    this.toastr.success('Please Enter again for logging', 'Logout Success');
    this.dialog.closeAll();
  }
}
