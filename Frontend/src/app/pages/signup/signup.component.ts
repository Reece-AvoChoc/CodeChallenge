import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<SignupComponent>
  ) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    this.authService.signup(this.email, this.password).subscribe(
      () => {
        this.dialogRef.close();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
