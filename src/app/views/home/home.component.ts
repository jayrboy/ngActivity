import { Component } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import Login from '../../models/login.model';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

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
  yearNow = new Date().getFullYear();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.token == null) {
      console.log('Token Not Found');
    }
    console.log(this.token);
  }
}
