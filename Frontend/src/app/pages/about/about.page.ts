import { Component } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { AboutModel } from './about-us.model';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: [],
})
export class AboutPage {
  aboutData: AboutModel = {
    id: '0',
    text: '',
  };

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.getAbout().subscribe({
      next: (res: AboutModel) => {
        this.aboutData = res;
      },
    });
  }
}
