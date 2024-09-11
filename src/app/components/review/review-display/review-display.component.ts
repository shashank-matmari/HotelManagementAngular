import { Component } from '@angular/core';
import { Review } from '../../../models/review';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../../services/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-display',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './review-display.component.html',
  styleUrl: './review-display.component.css'
})
export class ReviewDisplayComponent {
  stars = [1, 2, 3, 4, 5];
  reviews: Review[] = [];
  isLoading: boolean = false;

  constructor(private reviewService: ReviewService, private location: Location, private router: Router) {
    // if (typeof localStorage !== 'undefined') {
    //   if (localStorage.getItem('user') == null) {
    //     this.router.navigate(['/landing']);
    //   }
    // }
    
  }

  async ngOnInit() {
    this.isLoading = true
    try {
      this.reviews = await this.reviewService.getAllReviews();
    } catch (error) {
      console.error('Failed to get review by ID', error);
    } finally {
      this.isLoading = false;
    }
  }

  goBack(): void {
    this.location.back();
  }

}
