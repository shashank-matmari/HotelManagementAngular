import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/headersAndFooters/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { LandingComponent } from "./components/headersAndFooters/landing/landing.component";
import { LoginComponent } from "./components/headersAndFooters/login/login.component";
import { LoginService } from './services/login.service';
import { FooterComponent } from "./components/headersAndFooters/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, LandingComponent, LoginComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HotelManagementFrontend';

  isLogged=false

  constructor(private authService:LoginService, private route:Router){
    if (typeof localStorage!=='undefined') {
      if(localStorage.getItem('user')!==null){
        this.isLogged=true
      }
    }
  }

}
