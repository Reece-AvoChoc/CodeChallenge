import { Component, EventEmitter, Output } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  @Output() registrationSuccess = new EventEmitter<void>();
  AddUserForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.AddUserForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.AddUserForm.valid) {
      const { username, email, password, confirmPassword } =
        this.AddUserForm.value;
      this.userService
        .registerUser(username, email, password, confirmPassword)
        .subscribe(
          (response) => {
            console.log('User registered successfully', response);
            this.AddUserForm.reset();
            this.registrationSuccess.emit();
          },
          (error) => {
            console.error('Registration failed', error);
          }
        );
    }
  }
}
