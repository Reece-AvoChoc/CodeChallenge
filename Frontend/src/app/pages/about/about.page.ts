import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../services/backend.service';
import { AboutModel } from './about-us.model';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
})
export class AboutPage {
  subHeading: string =
    'At StrumFusion, we are passionate about all things guitar. Our mission is to inspire and support guitar enthusiasts of all levels, from beginners picking up their first guitar to seasoned musicians perfecting their craft.';
  storyHeading1: string = 'Our Story';
  storyText1: string =
    "StrumFusion was founded by a group of guitar enthusiasts who wanted to create a vibrant community for fellow guitar lovers. Our journey began with a simple idea: to provide a space where guitarists can learn, share, and grow together. Over the years, we've grown into a trusted resource for guitar players around the world.";
  storyHeading2: string = 'Our Philosophy';
  storyText2: string =
    "We believe that playing the guitar is more than just a hobby; it's a lifelong journey of discovery and expression. At StrumFusion, we are committed to fostering a supportive and inclusive environment where everyone can thrive. We are here to celebrate your successes, guide you through challenges, and inspire you to keep playing.";

  listItem1: string =
    "Our step-by-step lessons cover everything from basic chords and strumming patterns to advanced techniques and music theory. Whether you're just starting out or looking to refine your skills, we have something for everyone.";
  listItem2: string =
    'Learn from experienced guitarists and industry professionals. Our tutorials and tips are designed to help you overcome challenges and take your playing to the next level.';
  listItem3: string =
    'Choosing the right gear can be overwhelming. Our in-depth reviews and recommendations will help you find the perfect guitar, amp, pedals, and accessories to suit your style and budget.';
  listItem4: string =
    'Connect with fellow guitarists from around the globe. Our forums, social media channels, and live events provide a platform for you to share your experiences, ask questions, and get feedback.';
  joinText: string =
    "Whether you're picking up a guitar for the first time or looking to enhance your skills, StrumFusion is here to support you every step of the way. Join our community, explore our resources, and let your guitar journey begin!";

  isModalOpen: boolean = false;
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  showError: boolean = false;
  showWelcomePopup: boolean = false;
  welcomeMessage: string = '';
  joinMessage: string = '';
  dataError: boolean = false; // Error state

  aboutData: AboutModel = {
    id: '0',
    subHeading: '',
    storyHeading1: '',
    storyText1: '',
    storyHeading2: '',
    storyText2: '',
    listItem1: '',
    listItem2: '',
    listItem3: '',
    listItem4: '',
    joinText: '',
  };

  joinForm: FormGroup;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder
  ) {
    this.joinForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.showError = false;
    console.log('Modal closed');
  }

  submitForm() {
    if (this.joinForm.invalid) {
      this.showError = true;
      console.log('Form invalid');
      return;
    }

    const fullName = `${this.name} ${this.surname}`;

    this.welcomeMessage = 'Welcome to StrumFusion, John Doe!';
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
        this.dataError = false; // Reset error state on successful fetch
      },
      error: (error) => {
        console.log(error);
        this.dataError = true; // Set error state on fetch failure
      },
    });
  }
}
