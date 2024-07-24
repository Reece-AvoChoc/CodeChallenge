import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-popup-card',
    templateUrl: './popup-card.component.html',
    styleUrls: ['./popup-card.component.css']
})
export class PopupCardComponent {
    @Input() cardDetails!: { title: string; image: string; description: string; popupImage: string; url: string };

    constructor(private router: Router) { }

    navigateToUrl(url: string): void {
        this.router.navigate([url]);
    }
}
