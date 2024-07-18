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

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
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
      this.markAllAsTouched();
      console.log("Form invalid");
      return;
    }
    console.log(this.joinForm.value);
    this.joinForm.reset();
    console.log("route");
    this.router.navigate(["/home"]);
  }

  onRegister() {
    this.router.navigate(["/register"]);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.backendService.getImage("guitar").subscribe({
      next: (res) => {
        this.imageData = res;
        console.log(res.url);
      },
    });

    this.backendService.getHomePageMessage().subscribe({
      next: (res) => {
        this.homeMessage = res;
        console.log(this.homeMessage);
      },
    });
  }
}
