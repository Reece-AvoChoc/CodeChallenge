import { Component } from '@angular/core';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [],
})
export class HomePage {
  imageData: any;
  homeMessage: string | undefined;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.backendService.getImage('guitar').subscribe({
      next: (res) => {
        this.imageData = res;
        console.log(res.url);
      },
    });

    this.backendService.getHomePageMessage().subscribe({
      next: (res) => {
        this.homeMessage = res;
        console.log(this.homeMessage);
      },
    });
  }
}
