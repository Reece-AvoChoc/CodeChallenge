import { Component } from "@angular/core";
import { UserModel } from "../../models/user.model";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent {
  user?: UserModel;
  backendService: any;
  router: any;

  getUserInitials(): string | undefined {
    if (this.user?.email) {
      const initials = this.user.email[0].toUpperCase();
      return initials;
    }
    return undefined;
  }

  deleteUser() {
    this.backendService.deleteUser(this.user?.email).subscribe({
      next: () => {
        this.router.navigateByUrl("/login");
      },
    });
  }
}
