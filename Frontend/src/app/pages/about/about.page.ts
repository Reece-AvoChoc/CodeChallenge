import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.css'],
})
export class AboutPage implements OnInit {
  backgroundImageUrl: string | ArrayBuffer | null = null;
  overviewHeading: string | null = null;
  overviewBody: string | null = null;
  missionHeading: string | null = null;
  missionBody: string | null = null;
  teamHeading: string | null = null;
  teamBody: string | null = null;

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.loadBackgroundImage();
    this.loadOverviewHeading();
    this.loadOverviewBody();
    this.loadMissionHeading();
    this.loadMissionBody();
    this.loadTeamHeading();
    this.loadTeamBody();
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
    this.backendService.getHeading().subscribe(
      (heading: string) => {
        this.overviewHeading = heading;
      },
      (error) => {
        console.error('Failed to load overview heading', error);
        this.router.navigate(['/error']);
      }
    );
  }

  loadOverviewBody(): void {
    this.backendService.getBody().subscribe(
      (body: string) => {
        this.overviewBody = body;
      },
      (error) => {
        console.error('Failed to load overview body', error);
        this.router.navigate(['/error']);
      }
    );
  }

  loadMissionHeading(): void {
    this.backendService.getMissionHeading().subscribe(
      (missionTitle: string) => {
        this.missionHeading = missionTitle;
      },
      (error) => {
        console.error('Failed to load Mission heading', error);
        this.router.navigate(['/error']);
      }
    );
  }

  loadMissionBody(): void {
    this.backendService.getMissionBody().subscribe(
      (missionBody: string) => {
        this.missionBody = missionBody;
      },
      (error) => {
        console.error('Failed to load Mission Body', error);
        this.router.navigate(['/error']);
      }
    );
  }

  loadTeamHeading(): void {
    this.backendService.getTeamHeading().subscribe(
      (teamTitle: string) => {
        this.teamHeading = teamTitle;
      },
      (error) => {
        console.error('Failed to load Team heading', error);
        this.router.navigate(['/error']);
      }
    );
  }

  loadTeamBody(): void {
    this.backendService.getTeamBody().subscribe(
      (teamBody: string) => {
        this.teamBody = teamBody;
      },
      (error) => {
        console.error('Failed to load Team Body', error);
        this.router.navigate(['/error']);
      }
    );
  }
}
