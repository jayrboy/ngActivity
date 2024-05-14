import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import Login from '../../models/login.model';
import Response from '../../models/response';

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
  hide = true;
  username = new FormControl('', [Validators.required]);
  account = new Login();
  token = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmitLogin() {
    // console.log(this.account);

    if (this.account.username == '' || this.account.password == '') {
      return alert('Please Enter a Username and Password');
    }

    this.authService.login(this.account).subscribe(
      (result: Response) => {
        // console.log(result.data);

        this.token = result.data.token;
        localStorage.setItem('token', this.token);
        alert('Login Successfully');
        this.router.navigate(['/']); // Navigate to /home
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
