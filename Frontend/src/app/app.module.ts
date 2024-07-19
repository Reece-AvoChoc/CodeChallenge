import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HomePage } from "./pages/home/home.page";
import { AboutPage } from "./pages/about/about.page";
import { provideHttpClient } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { GetInTouchPopupComponent } from "./components/get-in-touch-popup/get-in-touch-popup.component";
import { ErrorPageComponent } from "./pages/error-page/error-page.component";
import { LoginPage } from "./pages/login/login.page";
import { RegisterPage } from "./pages/register/register.page";
import { ProfileComponent } from "./pages/profile/profile.component";

const routes: Routes = [
  { path: "login", component: LoginPage },
  { path: "register", component: RegisterPage },
  { path: "home", component: HomePage },
  { path: "profile", component: ProfileComponent },
  { path: "about", component: AboutPage },
  { path: "", redirectTo: "/home", pathMatch: "full" }, // Default route
  { path: "**", component: ErrorPageComponent },
];

@NgModule({
  declarations: [AppComponent, HomePage, AboutPage],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    GetInTouchPopupComponent,
  ],
  providers: [provideHttpClient(), RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
