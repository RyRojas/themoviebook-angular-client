import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit {
  constructor(public dialog: MatDialog, public router: Router) {}

  ngOnInit(): void {}

  /**
   * Checks auth and route to determine whether to render submenu
   * @returns Auth Status boolean
   */
  isAuth() {
    if (localStorage.getItem('token')) {
      return this.router.url === '/welcome'
        ? this.router.navigate(['movies'])
        : true;
    } else {
      return this.router.url === '/movies'
        ? this.router.navigate(['welcome'])
        : false;
    }
  }

  /**
   * Opens Edit Profile Dialog Box
   */
  openProfileDialog() {
    this.dialog.open(UserProfileComponent, {
      width: '300px',
      panelClass: 'profile-dialog',
    });
  }

  /**
   * Logs user out
   */
  onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.router.navigate(['welcome']);
  }
}
