import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css'],
})
export class ContactDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    public httpClient: HttpClient
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitContactForm(formData: any): void {
    this.httpClient
      .post('http://localhost:5198/userinfo', {
        firstName: formData.name,
        lastName: formData.surname,
        email: formData.email,
        issue: formData.message,
      })
      .subscribe(() => {
        this.dialogRef.close();
      });
    console.log('Form submitted:', formData);
  }
}
