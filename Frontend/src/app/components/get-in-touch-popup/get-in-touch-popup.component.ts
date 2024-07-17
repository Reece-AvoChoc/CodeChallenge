import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BackendService } from "../../../services/backend.service";
import { RequestModel } from "../../models/request.model";

@Component({
  selector: "app-get-in-touch-popup",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./get-in-touch-popup.component.html",
  styleUrl: "./get-in-touch-popup.component.css",
})
export class GetInTouchPopupComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  model?: RequestModel;

  name: string = "";
  surname: string = "";
  email: string = "";
  issue: string = "";
  showError: boolean = false;
  isSubmitted: boolean = false;

  joinForm: FormGroup;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder
  ) {
    this.joinForm = this.formBuilder.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      issue: ["", Validators.required],
    });

    this.model = {
      Name: "",
      Surname: "",
      Email: "",
      request: "",
    };
  }

  submitForm() {
    if (this.joinForm.invalid) {
      this.showError = true;
      console.log("Form invalid");
      return;
    }
    console.log("Form valid");

    this.isSubmitted = true;
    this.closeModal();
  }

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.resetForm();
  }

  closeGetInTouchPopup() {
    this.isSubmitted = false;
  }

  resetForm() {
    this.joinForm.reset();
  }
}
