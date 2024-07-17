import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css'],
})
export class ContactDialogComponent {
  constructor(public dialogRef: MatDialogRef<ContactDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitContactForm(formData: any): void {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    this.dialogRef.close();
  }
}
