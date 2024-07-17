import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Make sure FormsModule is imported for ngModel
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [],
})
export class HomePage {
  constructor(public dialog: MatDialog) {}

  openContactDialog(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '400px', // Adjust the width as needed
      data: {}, // You can pass data to the dialog if needed
    });

    // Handle dialog closing or any other actions
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // Handle any actions after the dialog is closed
    });
  }
}
