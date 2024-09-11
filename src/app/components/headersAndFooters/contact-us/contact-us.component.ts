import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  contactForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Getter for form controls
  get formControls() {
    return this.contactForm.controls;
  }

  // Function to handle form submission
  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    // Set form submission status to true
    this.submitted = true;

    // Here you can add logic to send the form data to your backend or email service
    console.log('Form submitted successfully:', this.contactForm.value);

    // Reset the form after submission if needed
    this.contactForm.reset();
  }
}
