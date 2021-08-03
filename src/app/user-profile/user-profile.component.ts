import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../fetch-api-data.service';

interface User {
  Username?: string;
  Email?: string;
  Birth?: Date;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userInput = {
    Username: '',
    Password: '',
    ConfirmPassword: '',
    Email: '',
    Birth: '',
  };

  userData: User = {};

  constructor(
    public fetchApiData: ApiService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.fetchApiData.getUser().subscribe(
      //Successful get request
      (response) => {
        console.log(response);
        this.userData = response;
        console.log(this.userData);
      },
      //Failed get
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  //Creates request body with only provided values
  createPutBody() {
    const data = this.userInput;

    const formData = {
      ...(data.Username && { Username: data.Username }),
      ...(data.Password && { Password: data.Password }),
      ...(data.Email && { Email: data.Email }),
      ...(data.Birth && { Birth: data.Birth }),
    };

    return formData;
  }

  editUser() {
    const request = this.createPutBody();

    this.fetchApiData.editUser(request).subscribe(
      //Successful update
      (response) => {
        this.dialogRef.close();

        //If username changed, change username in local storage
        this.userInput.Username &&
          localStorage.setItem('user', this.userInput.Username);

        this.snackBar.open('Profile successfully updated', 'OK', {
          duration: 2000,
        });
      },
      //Failed update
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
