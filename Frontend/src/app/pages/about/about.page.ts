import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BackendService } from "../../../services/backend.service";
import { AboutModel } from "./about-us.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-about",
  templateUrl: "about.page.html",
})
export class AboutPage {
  isModalOpen: boolean = false;
  showError: boolean = false;
  showWelcomePopup: boolean = false;
  welcomeMessage: string = "";
  joinMessage: string = "";
  dataError: boolean = false; // Error state

  aboutData: AboutModel = {
    id: "0",
    subHeading: "",
    storyHeading1: "",
    storyText1: "",
    storyHeading2: "",
    storyText2: "",
    listItem1: "",
    listItem2: "",
    listItem3: "",
    listItem4: "",
    joinText: "",
  };

  joinForm: FormGroup;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.joinForm = this.formBuilder.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.showError = false;
    console.log("Modal closed");
  }

  markAllAsTouched() {
    Object.keys(this.joinForm.controls).forEach((field) => {
      const control = this.joinForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  submitForm() {
    if (this.joinForm.invalid) {
      this.markAllAsTouched();
      console.log("Form invalid");
      return;
    }

    // Retrieve the user's name from the form
    const userName = this.joinForm.get("name")?.value;
    const userSurname = this.joinForm.get("surname")?.value;

    // Update the welcomeMessage with the user's name
    this.welcomeMessage = `Welcome to StrumFusion, ${userName} ${userSurname}!`;

    this.joinMessage =
      "We're thrilled to have you on board. You're now part of a global community of guitar enthusiasts who share your passion for music. Get ready to learn, connect, and grow with us. The journey starts now!";

    this.closeModal();

    setTimeout(() => {
      this.showWelcomePopup = true;
    }, 300);

    this.joinForm.reset();
  }

  ngOnInit() {
    this.backendService.getAbout().subscribe({
      next: (res: AboutModel) => {
        this.aboutData = res;
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(["/not-found"]); // Navigate to 404 on error
      },
    });
  }
}
