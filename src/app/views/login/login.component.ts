import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import Login from '../../models/login.model';
import Response from '../../models/response.model';
import { AuthService } from '../../services/auth.service';

import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Properties
  hide = true;
  username = new FormControl('', [Validators.required]);

  loginForm = new Login();
  token = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmitLogIn(): void {
    if (this.loginForm.username == '' || this.loginForm.password == '') {
      this.toastr.warning('User Not found', 'Please Enter Account');
    } else {
      this.authService.logIn(this.loginForm).subscribe(
        (result: Response) => {
          this.token = result.data.token;
          this.authService.setToken(this.token); // Set the token in the service
          this.router.navigate(['/dashboard']);
          this.toastr.success('Login Successfully', 'Success');
        },
        (error) => {
          this.toastr.warning('Failed to Account', 'Please Enter Again !');
        }
      );
    }
  }
}
