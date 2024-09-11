import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserDetails } from '../../../models/user-details';
import { SignupService } from '../../../services/signup.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails!: UserDetails;
  loading = true;
  error?: string;
  editMode = false;
  editForm!: FormGroup;
  showDetails = false;

  constructor(
    private route: ActivatedRoute,
    private userService: SignupService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private loginService:LoginService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    if (typeof localStorage !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user')!);
      if (user == null) {
        this.router.navigate(['/landing']);
      }else{
        this.userDetails=user
        this.patchFormValues()
      }

    }

  }

  initializeForm(): void {
    this.editForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{6,12}$/)]]
    });
  }

  fetchUserDetails(userId: number): void {
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.userDetails = data;
        this.loading = false;
        this.patchFormValues();
      },
      error: () => {
        this.error = 'Error fetching user details';
        this.loading = false;
      }
    });
  }

  patchFormValues(): void {
    this.editForm.patchValue({
      user_name: this.userDetails.user_name,
      email: this.userDetails.email,
      password: this.userDetails.password
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.patchFormValues();
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedUser: UserDetails = {
        ...this.userDetails,
        ...this.editForm.value
      };
      this.userService.updateUser(updatedUser.user_id, updatedUser).subscribe({
        next: () => {
          this.loginService.setData(updatedUser)  // Pass user_id to refresh data
          this.editMode = false;
        },
        error: () => {
          this.error = 'Error updating user details';
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
