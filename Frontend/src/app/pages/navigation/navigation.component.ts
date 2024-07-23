import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(public dialog: MatDialog, private authService: AuthService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  openLogin() {
    this.dialog.open(LoginComponent);
  }

  openSignup() {
    this.dialog.open(SignupComponent);
  }

  logout() {
    this.authService.logout();
  }

  openEditUser() {
    this.dialog.open(EditUserComponent);
  }

  deleteUser() {
    this.authService.deleteUser();
  }
}
