import { Component, HostListener } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Frontend";
  isDropdownOpen: boolean = false;
  isNavbarOpen = false;
  isModalOpen = false;
  showNavBar = true;
  showLogin = false;
  userName = "John Doe";

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavBar = event.url !== "/login" && event.url !== "/register";
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  // @HostListener("document:click", ["$event"])
  // handleClickOutside(event: Event) {
  //   const target = event.target as HTMLElement;
  //   if (!target.closest(".topbar")) {
  //     this.isDropdownOpen = false;
  //   }
  // }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getUserInitials(): string {
    const initials = this.userName
      .split(" ")
      .map((name) => name[0])
      .join("");
    return initials.toUpperCase();
  }
}
