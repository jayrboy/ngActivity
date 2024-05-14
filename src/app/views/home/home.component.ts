import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import Login from '../../models/login.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  account = new Login();
  token = localStorage.getItem('token');
  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.token == null) {
      console.log('Token Not Found');
    }
    console.log(this.token);
  }
}
