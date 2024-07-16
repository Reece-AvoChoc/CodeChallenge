import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {
  backgroundImageUrl: string | ArrayBuffer | null = null;
  overviewHeading: string | null = null;
  overviewSubheading: string | null = null;

  constructor(private backendService: BackendService) {}

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
      }
    );
  }
}
