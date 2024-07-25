import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePage } from './pages/home/home.page';
import { AboutPage } from './pages/about/about.page';
import { ErrorPage } from './errorpage/errorpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogInPromptComponent } from './log-in-prompt/log-in-prompt.component';
import { LoginService } from './login.service';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'about', component: AboutPage },
  { path: 'error', component: ErrorPage },
  { path: 'form', component: ContactFormComponent },
  { path: 'users', component: UserListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    AboutPage,
    NavbarComponent,
    LogInPromptComponent,
    AddUserComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],

  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
