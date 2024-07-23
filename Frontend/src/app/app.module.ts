import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { AboutPage } from './pages/about/about.page';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GetInTouchPopupComponent } from './components/get-in-touch-popup/get-in-touch-popup.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';


const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'home', component: HomePage, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutPage, canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  declarations: [AppComponent, HomePage, AboutPage],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    GetInTouchPopupComponent,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [provideHttpClient(), RouterModule, provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule {}
