import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
  };

  constructor(
    public fetchApiData: ApiService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.loginUser(this.userData).subscribe(
      (response) => {
        //Success
        console.log(response);
        this.dialogRef.close();
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        //Failed
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
