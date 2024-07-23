import { Component } from "@angular/core";
import { BackendService } from "../../../services/backend.service";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoginRequest } from "../../models/login-request.model";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-login",
  templateUrl: "login.page.html",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: [],
})
export class LoginPage {
  imageData: any;
  homeMessage: string | undefined;
  joinForm: FormGroup;
  firstname: string | undefined;
  lastname: string | undefined;
  loginError: boolean = false;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.joinForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  markAllAsTouched() {
    Object.keys(this.joinForm.controls).forEach((field) => {
      const control = this.joinForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  submitForm() {
    if (this.joinForm.invalid) {
      this.loginError = true;
      this.markAllAsTouched();
      console.log("Form invalid");
      return;
    }
    console.log(this.joinForm.value);
    const model: LoginRequest = {
      email: this.joinForm.value.email,
      password: this.joinForm.value.password,
    };

    this.backendService.login(model).subscribe({
      next: (response) => {
        console.log(response);
        // Set Auth Cookie
        this.firstname = response.firstName;
        this.lastname = response.lastName;
        this.cookieService.set(
          "Authorization",
          `Bearer ${response.token}`,
          undefined,
          "/",
          undefined,
          true,
          "Strict"
        );

        // set user
        this.backendService.setUser({
          email: this.joinForm.value.email,
          firstName: this.firstname,
          lastName: this.lastname,
        });

        // Redirect to home
        this.router.navigateByUrl("/");
        this.loginError = false;
      },
      error: (err) => {
        console.error(err);
        console.log("Error logging in");
        this.loginError = true;
      },
    });
  }

  onRegister() {
    this.router.navigate(["/register"]);
  }

  ngOnInit(): void {}
}
