import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Make sure FormsModule is imported for ngModel

import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { AboutPage } from './pages/about/about.page';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { FooterComponent } from './pages/footer/footer.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FocusComponent } from './pages/focus/focus.component';
import { TreatmentComponent } from './pages/treatment/treatment.component';
import { ModeComponent } from './pages/mode/mode.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ContactDialogComponent } from './pages/contact-dialog/contact-dialog.component';
import { Error404Component } from './pages/error404/error404.component';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'about', component: AboutPage },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', component: Error404Component }, // Wildcard route for 404
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    AboutPage,
    NavigationComponent,
    FooterComponent,
    GalleryComponent,
    FocusComponent,
    TreatmentComponent,
    ModeComponent,
    ContactDialogComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    // Add other imported modules here
  ],
  exports: [RouterModule],

  providers: [provideAnimationsAsync(), provideAnimationsAsync('noop')],
  bootstrap: [AppComponent],
})
export class AppModule {}
