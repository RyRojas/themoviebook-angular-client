import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birth: '',
  };

  constructor(
    public fetchApiData: ApiService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registerUser(): void {
    this.fetchApiData.registerUser(this.userData).subscribe(
      (response) => {
        //Logic for successful registration goes here (to be implemented)
        this.dialogRef.close();
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        //Logic for failed registration (TBI)
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
