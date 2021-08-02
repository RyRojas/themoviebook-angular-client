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

  openProfileDialog() {
    this.dialog.open(UserProfileComponent);
  }

  onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.router.navigate(['welcome']);
  }
}
