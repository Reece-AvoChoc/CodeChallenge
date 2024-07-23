import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password);
    this.dialogRef.close();
  }
}
