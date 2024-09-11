import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { SignupService } from '../../../services/signup.service';
import { UserDetails } from '../../../models/user-details';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  roles: string[] = ['Admin', 'Manager']; // Example roles
  isAvailable=true

  constructor(private fb: FormBuilder, private service:SignupService, private router:Router, private location:Location) {

    this.signupForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$*#])[A-Za-z\\d@$*#]{6,12}$')]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@email\\.com$')]],
      role: ['User', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    if(typeof localStorage!=='undefined'){
      const user=localStorage.getItem('user')
      if(user==null){
        this.isAvailable=false
        this.router.navigate(['/singup'])
      }
        this.router.navigate(['/signup'])
       this.isAvailable=true 
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  toggleShowPassword(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const user: UserDetails = this.signupForm.value;
      this.service.createUser(user).subscribe({
        next: (response) => {
          alert('User created successfully');
          this.router.navigate(['/landing'])
        },
        error: (error) => {
          console.error('Error creating user', error);
          // Handle error 
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
