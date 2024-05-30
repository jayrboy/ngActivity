import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ngActivity';
  showFiller = false;
  token: string | null = null;
  tokenSubscription = new Subscription();
  role: string | null = null;
  roleSubscription = new Subscription();

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit() {
    this.tokenSubscription = this.authService.token$.subscribe((token) => {
      this.token = token;
    });
    this.roleSubscription = this.authService.role$.subscribe(
      (role) => (this.role = role)
    );
  }

  ngOnDestroy() {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(DialogComponent, {
      width: '350px',
      height: '200px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

// Dialog "Log Out" Component
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent],
  template: `
    <div class="p-3">
      <h1 mat-dialog-title class="text-center">Log Out</h1>

      <mat-dialog-content class="text-center">
        ต้องการออกจากระบบหรือไม่?
      </mat-dialog-content>
    </div>

    <mat-dialog-actions align="center">
      <button
        (click)="dialog.closeAll()"
        mat-button
        mat-dialog-close
        color="primary"
      >
        ยกเลิก
      </button>
      <button
        (click)="onClickLogOut()"
        mat-stroked-button
        mat-dialog-close
        color="warn"
      >
        ออกจากระบบ
      </button>
    </mat-dialog-actions>
  `,
})
class DialogComponent {
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  onClickLogOut() {
    this.authService.clearToken();
    this.dialog.closeAll();
    this.router.navigate(['/login']);
  }
}
