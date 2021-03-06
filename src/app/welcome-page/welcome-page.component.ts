import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * Open registration dialog
   */
  openUserRegistrationDialog() {
    this.dialog.open(UserRegistrationFormComponent, {
      //Assign dialog width
      width: '300px',
    });
  }

  /**
   * Open login dialog
   */
  openUserLoginDialog() {
    this.dialog.open(LoginFormComponent, {
      //Assign dialog width
      width: '300px',
    });
  }
}
