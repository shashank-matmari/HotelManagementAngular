import { Component } from '@angular/core';
import { PopUpComponent } from '../../headersAndFooters/pop-up/pop-up.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../../../models/review';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, PopUpComponent, ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent {
  reviewForm: FormGroup;
  stars = [1, 2, 3, 4, 5];
  review_id!: number;
  review!: Review;
  showReviews = false;
  isEditMode = false;

  // Popup state
  showPopup = false;
  popupTitle = '';
  popupMessage = '';

  // Loading state
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.reviewForm = this.fb.group({
      review_id: [{ value: '', disabled: true }],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required],
      review_date: ['', Validators.required],
      reservation_id: [28, Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    // if (typeof localStorage !== 'undefined') {
    //   if (localStorage.getItem('user') == null) {
    //     this.router.navigate(['/landing']);
    //   }
    // }

    this.activatedRoute.paramMap.subscribe(async params => {
      this.review_id = parseInt(params.get('review_id')!);
      if(this.review_id){
        await this.getReviewById(this.review_id);
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.reviewForm.valid) {
      const reviewData: Review = this.reviewForm.getRawValue();
      this.isLoading = true;
      try {
        if (this.isEditMode) {
          await this.updateReview(reviewData);
        } else {
          await this.createReview(reviewData);
        }
      } catch (error) {
        this.popupTitle = 'Error!';
        this.popupMessage = 'There was a technical error. Please try again later.';
        this.showPopup = true;
      } finally {
        this.isLoading = false;
      }
    }
  }

  onStarClick(star: number): void {
    this.reviewForm.get('rating')?.setValue(star);
  }

  async getReviewById(review_id: number): Promise<void> {
    try {
      this.review = await this.reviewService.getReviewById(review_id);
      this.reviewForm.patchValue(this.review);
      this.isEditMode = true;
    } catch (error) {
      console.error('Failed to get review by ID', error);
    }
  }

  async createReview(review: Review): Promise<void> {
    try {
      await this.reviewService.createReview(review);
      this.popupTitle = 'Thank You!';
      this.popupMessage = 'Thanks for your valuable feedback. Visit us again!';
      this.reviewForm.reset();
      this.showPopup = true;
      this.isEditMode = false;
    } catch (error) {
      console.error('Failed to create review', error);
    }
  }

  async updateReview(reviewData: Review): Promise<void> {
    try {
      await this.reviewService.updateReview(reviewData.review_id, reviewData);
      this.popupTitle = 'Thank You!';
      this.popupMessage = 'Thanks for your valuable feedback. Visit us again!';
      this.reviewForm.reset();
      this.showPopup = true;
      this.isEditMode = false;
    } catch (error) {
      console.error('Failed to update review', error);
    }
  }

  async deleteReviewById(id: number): Promise<void> {
    try {
      await this.reviewService.deleteReviewById(id);
    } catch (error) {
      console.error('Failed to delete review', error);
    }
  }

  editReview(review: Review): void {
    this.reviewForm.patchValue(review);
    this.isEditMode = true;
  }

  goBack(): void {
    this.router.navigate(['/']); // Adjust this to navigate to the previous route or a specific one
  }  

}
