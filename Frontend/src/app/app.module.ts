import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { AboutPage } from './pages/about/about.page';
import { ErrorPage } from './errorpage/errorpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'about', component: AboutPage },
  { path: 'error', component: ErrorPage },
  { path: 'form', component: ContactFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
];

@NgModule({
  declarations: [AppComponent, HomePage, AboutPage, NavbarComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
