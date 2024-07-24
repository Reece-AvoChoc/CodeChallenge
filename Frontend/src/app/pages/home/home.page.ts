import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/backend.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    backgroundImageUrl: string | ArrayBuffer | null = null;

    cards = [
        {
            title: 'Windows',
            image: '',
            description: 'Windows description',
            popupImage: '',
            url: '/windows'
        },
        {
            title: 'Mac',
            image: '',
            description: 'Apple description',
            popupImage: '',
            url: '/apple'
        }
    ];

    constructor(private backendService: BackendService) { }

    ngOnInit(): void {
        this.getBackgroundImage();
        this.getAppleImage();
        this.getWindowsImage();
        this.getLaptop();
        this.getMac();
    }

    getBackgroundImage(): void {
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

    getAppleImage(): void {
        this.backendService.getAppleImage().subscribe(
            (imageBlob: Blob) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const appleImage = event.target?.result ?? null;
                    if (typeof appleImage === 'string') {
                        this.cards[1].image = appleImage;
                    }
                };
                reader.readAsDataURL(imageBlob);
            },
            (error) => {
                console.error('Failed to load Apple image', error);
            }
        );
    }

    getWindowsImage(): void {
        this.backendService.getWindowsImage().subscribe(
            (imageBlob: Blob) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const windowsImage = event.target?.result ?? null;
                    if (typeof windowsImage === 'string') {
                        this.cards[0].image = windowsImage;
                    }
                };
                reader.readAsDataURL(imageBlob);
            },
            (error) => {
                console.error('Failed to load Windows image', error);
            }
        );
    }

    getLaptop(): void {
        this.backendService.getLaptop().subscribe(
            (imageBlob: Blob) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const windowsImage = event.target?.result ?? null;
                    if (typeof windowsImage === 'string') {
                        this.cards[0].popupImage = windowsImage;
                    }
                };
                reader.readAsDataURL(imageBlob);
            },
            (error) => {
                console.error('Failed to load Windows image', error);
            }
        );
    }

    getMac(): void {
        this.backendService.getMac().subscribe(
            (imageBlob: Blob) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const windowsImage = event.target?.result ?? null;
                    if (typeof windowsImage === 'string') {
                        this.cards[1].popupImage = windowsImage;
                    }
                };
                reader.readAsDataURL(imageBlob);
            },
            (error) => {
                console.error('Failed to load Windows image', error);
            }
        );
    }
}
