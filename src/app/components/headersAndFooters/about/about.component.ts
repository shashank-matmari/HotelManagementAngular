import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  // images: string[] = [
  //   'assets/images/hotels/hotel1.jpeg',
  //   'assets/images/hotels/hotel2.jpeg',
  //   'assets/images/hotels/hotel3.jpeg',
  //   'assets/images/hotels/hotel4.jpeg',
  //   'assets/images/hotels/hotel6.jpeg'
  // ];
  // currentIndex = 0;
  // isBrowser: boolean;

  // constructor(
  //   private renderer: Renderer2,
  //   @Inject(PLATFORM_ID) private platformId: object
  // ) {
  //   this.isBrowser = isPlatformBrowser(this.platformId);
  // }

  // ngOnInit() {
  //   if (this.isBrowser) {
  //     this.startSlider();
  //   }
  // }

  // startSlider() {
  //   setInterval(() => {
  //     const slides = document.getElementsByClassName('slide');
  //     if (slides.length > 0) {
  //       this.renderer.removeClass(slides[this.currentIndex], 'active');
  //       this.currentIndex = (this.currentIndex + 1) % slides.length;
  //       this.renderer.addClass(slides[this.currentIndex], 'active');
  //     }
  //   }, 3000);
  // }
}
