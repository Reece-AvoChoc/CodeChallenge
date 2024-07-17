import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { AboutPage } from './pages/about/about.page';
import { FocusComponent } from './pages/focus/focus.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ModeComponent } from './pages/mode/mode.component';
import { TreatmentComponent } from './pages/treatment/treatment.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { FooterComponent } from './pages/footer/footer.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Frontend';
}
