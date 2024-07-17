import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

type AboutContent = {
  subtitle: String;
  recharge: String;
  relax: String;
  rejuvenate: String;
  refresh: String;
};

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: [],
})
export class AboutPage {
  constructor(public httpClient: HttpClient, public router: Router) {}
  public aboutContent: AboutContent = {
    subtitle: '',
    recharge: '',
    relax: '',
    rejuvenate: '',
    refresh: '',
  };
  ngOnInit() {
    this.httpClient
      .get<AboutContent>('http://localhost:5198/aboutus')
      .subscribe(
        (data: AboutContent) => {
          this.aboutContent = data;
        },
        () => {
          this.router.navigate(['/404']);
        }
      );
  }
}
