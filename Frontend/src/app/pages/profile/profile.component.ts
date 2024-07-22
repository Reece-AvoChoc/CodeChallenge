import { Component } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user?: UserModel;

  constructor(private router: Router, private backendService: BackendService) {
    this.user = this.backendService.getUser();
  }

  getUserInitials(): string | undefined {
    if (this.user?.email) {
      const initials = this.user.email[0].toUpperCase();
      return initials;
    }
    return undefined;
  }

  deleteUser() {
    if (this.user?.email) {
      this.backendService.delete(this.user.email).subscribe({
        next: () => {
          this.backendService.logout();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        }
      });
    }
  }
}
