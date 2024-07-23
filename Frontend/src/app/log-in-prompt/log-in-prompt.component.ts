import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'log-in',
  templateUrl: './log-in-prompt.component.html',
  styleUrl: './log-in-prompt.component.css',
})
export class LogInPromptComponent {
  loginForm: FormGroup;
  isVisible: boolean = true;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
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
