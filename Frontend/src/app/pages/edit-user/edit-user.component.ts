import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {
  newEmail: string = '';
  newPassword: string = '';

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditUserComponent>,
    private dialog: MatDialog
  ) {}

  onSubmit() {
    this.authService.editUser(this.newEmail, this.newPassword);
    this.dialogRef.close();
  }

  openDeleteUser() {
    const dialogRef = this.dialog.open(DeleteUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'deleted') {
        this.dialogRef.close();
      }
    });
  }
}
