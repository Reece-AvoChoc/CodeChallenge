import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private users = new Map<string, { email: string; password: string }>();

  constructor() {}

  login(email: string, password: string) {
    const user = this.users.get(email);
    if (user && user.password === password) {
      this.isAuthenticated = true;
      // Additional login logic
    } else {
      alert('Invalid email or password');
    }
  }

  signup(email: string, password: string) {
    if (this.users.has(email)) {
      alert('Email already registered');
      return;
    }
    this.users.set(email, { email, password });
    this.isAuthenticated = true;
    // Additional signup logic
  }

  logout() {
    this.isAuthenticated = false;
    // Additional logout logic
  }

  deleteUser() {
    // Assuming a currentUser property or similar to track logged in user
    const currentUser = 'currentUser@example.com'; // Replace with actual logic
    this.users.delete(currentUser);
    this.isAuthenticated = false;
    // Additional delete user logic
  }

  editUser(newEmail: string, newPassword: string) {
    // Assuming a currentUser property or similar to track logged in user
    const currentUser = 'currentUser@example.com'; // Replace with actual logic
    const user = this.users.get(currentUser);
    if (user) {
      if (newEmail) user.email = newEmail;
      if (newPassword) user.password = newPassword;
      this.users.set(currentUser, user);
    }
    // Additional edit user logic
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }
}
