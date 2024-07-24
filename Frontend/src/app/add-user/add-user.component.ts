import { Component } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  AddUserForm: FormGroup;
  isVisible: boolean = false;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.AddUserForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.AddUserForm.valid) {
      const { username, password } = this.AddUserForm.value;
      this.loginService.login(username, password).subscribe(
        (response) => {
          console.log('details: ', username, password);
          console.log('Login successful', response);
          this.isVisible = false;
        },
        (error) => {
          console.error('Login failed', error);
          this.isVisible = false;
        }
      );
    }
  }
}
