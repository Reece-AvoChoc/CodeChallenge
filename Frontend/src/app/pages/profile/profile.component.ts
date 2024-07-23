import { Component } from "@angular/core";
import { UserModel } from "../../models/user.model";
import { Router } from "@angular/router";
import { BackendService } from "../../../services/backend.service";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent {
  user?: UserModel;
  profileForm: FormGroup;

  constructor(
    private router: Router,
    private backendService: BackendService,
    private fb: FormBuilder
  ) {
    this.user = this.backendService.getUser();
    this.profileForm = this.fb.group({
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  updateUser() {
    if (this.profileForm.valid) {
      const updateUserModel = this.profileForm.value;
      this.backendService.update(updateUserModel).subscribe({
        next: (response) => {
          console.log("User updated successfully:", response);
          // Optionally update the local user data
          this.backendService.setUser(response);
          this.router.navigate(["/"]);
        },
        error: (err) => {
          console.error("Error updating user:", err);
        },
      });
    }
  }

  getUserInitials(): string | undefined {
    if (this.user?.firstName && this.user?.lastName) {
      const initials = `${this.user.firstName[0].toUpperCase()}${this.user.lastName[0].toUpperCase()}`;
      return initials;
    }
    return undefined;
  }

  deleteUser() {
    if (this.user?.email) {
      this.backendService.delete(this.user.email).subscribe({
        next: () => {
          this.backendService.logout();
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          console.error("Error deleting user:", err);
        },
      });
    }
  }
}
