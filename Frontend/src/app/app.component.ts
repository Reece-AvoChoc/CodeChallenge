import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Frontend';
  isDropdownOpen: boolean = false;
  isNavbarOpen = false;
  isModalOpen = false;
  showNavBar = true;
  showLogin = false;
  userName = '';

  user?: UserModel

  constructor(
    private router: Router,
    private backendService: BackendService,
    private cookieService: CookieService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavBar = event.url !== '/login' && event.url !== '/register';
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLogout(): void {
    this.closeDropdown()
    this.backendService.logout();
    this.router.navigateByUrl('/login');
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getUserInitials(): string | undefined {
    const initials = this.user?.email
      .split(' ')
      .map((name) => name[0])
      .join('');
    return initials?.toUpperCase();
  }

  ngOnInit(): void {
    this.backendService.user().subscribe({
      next: (response) => {
        console.log(response);
        this.user = response;
      },
    });

    this.user = this.backendService.getUser();
  }
}
