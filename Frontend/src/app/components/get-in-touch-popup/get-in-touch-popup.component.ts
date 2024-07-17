import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../services/backend.service';
import { RequestModel } from '../../models/request.model';

@Component({
  selector: 'app-get-in-touch-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './get-in-touch-popup.component.html',
  styleUrl: './get-in-touch-popup.component.css',
})
export class GetInTouchPopupComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  name: string = '';
  surname: string = '';
  email: string = '';
  issue: string = '';
  showError: boolean = false;

  joinForm: FormGroup;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder
  ) {
    this.joinForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      issue: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.joinForm.invalid) {
      this.showError = true;
      console.log('Form invalid');
      return;
    }

    const requestModel: RequestModel = {
      Name: this.joinForm.value.name,
      Surname: this.joinForm.value.surname,
      Email: this.joinForm.value.email,
      request: this.joinForm.value.issue,
    };

    console.log('Form valid');
    this.backendService.createRequest(requestModel).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error)
      }
    });
    this.closeModal();
  }

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.resetForm();
  }

  resetForm() {
    this.joinForm.reset();
  }
}
