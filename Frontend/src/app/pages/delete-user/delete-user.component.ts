import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent {
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<DeleteUserComponent>
  ) {}

  onDelete() {
    this.authService.deleteUser().subscribe(
      () => {
        this.dialogRef.close('deleted');
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onCancel() {
    this.dialogRef.close();
  }
}
