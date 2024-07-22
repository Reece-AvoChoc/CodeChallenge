import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 0.8 })),
      ]),
    ]),
  ],
})
export class HomePage implements OnInit {
  backgroundImageUrl: string | ArrayBuffer | null = null;
  overviewHeading: string | null = null;
  overviewSubheading: string | null = null;

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.loadBackgroundImage();
    this.loadOverviewHeading();
    this.loadOverviewSubheading();
  }

  loadBackgroundImage(): void {
    this.backendService.getBackgroundImage().subscribe(
      (imageBlob: Blob) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.backgroundImageUrl = event.target?.result ?? null;
        };
        reader.readAsDataURL(imageBlob);
      },
      (error) => {
        console.error('Failed to load background image', error);
        this.router.navigate(['/error']);
      }
    );
  }

  loadOverviewHeading(): void {
    this.backendService.getOverviewHeading().subscribe(
      (heading: string) => {
        this.overviewHeading = heading;
      },
      (error) => {
        console.error('Failed to load overview heading', error);
        this.router.navigate(['/error']);
      }
    );
  }

  loadOverviewSubheading(): void {
    this.backendService.getOverviewSubHeading().subscribe(
      (subheading: string) => {
        this.overviewSubheading = subheading;
      },
      (error) => {
        console.error('Failed to load overview heading', error);
        this.router.navigate(['/error']);
      }
    );
  }
}
