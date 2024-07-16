import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { AboutPage } from './pages/about/about.page';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'about', component: AboutPage },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
];

@NgModule({
  declarations: [AppComponent, HomePage, AboutPage],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
