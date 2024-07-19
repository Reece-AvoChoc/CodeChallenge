import { Component, OnInit } from "@angular/core";
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

@Component({
  selector: "app-register",
  templateUrl: "register.page.html",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: [],
})
export class RegisterPage implements OnInit {
  imageData: any;
  homeMessage: string | undefined;
  joinForm: FormGroup;

  name: string = "";
  surname: string = "";
  email: string = "";
  issue: string = "";

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.joinForm = this.formBuilder.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
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
      this.markAllAsTouched();
      console.log("Form invalid");
      return;
    }

    const formData = this.joinForm.value;

    this.backendService.register(formData).subscribe(
      (response) => {
        console.log("Registration successful", response);
        this.joinForm.reset();
        this.router.navigate(["/login"]);
      },
      (error) => {
        console.error("Registration failed", error);
      }
    );
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }
}
