import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { CommonModule } from '@angular/common';
import { AboutComponent } from "../about/about.component";
import { ContactUsComponent } from "../contact-us/contact-us.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LoginComponent, CommonModule, AboutComponent, ContactUsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  @ViewChild('loginSection') loginSection!: ElementRef;

  scrollToLogin() {
    this.loginSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
