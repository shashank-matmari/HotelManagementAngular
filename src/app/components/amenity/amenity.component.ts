import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AmenityService } from '../../services/amenity.service';
import { Amenity } from '../../models/amenity';

@Component({
  selector: 'app-amenity',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './amenity.component.html',
  styleUrls: ['./amenity.component.css']
})
export class AmenityComponent implements OnInit {
  amenity: FormGroup;
  showForm = false;
  amenities: Amenity[] = [];
  selectedAmenityIndex: number | null = null;
  isUpdating = false;


  constructor(private fb: FormBuilder, private amenityService: AmenityService) {
    this.amenity = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.getAllAmenities();
  }

  getAllAmenities(): void {
    this.amenityService.getAllAmenities().subscribe(data => {
      this.amenities = data;
    });
  }

  getAmenityById(id: number): void {
    this.amenityService.getAmenityById(id).subscribe(data => {
      this.amenity.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.isUpdating) {
      // Update existing amenity
      const updatedAmenity = {
        amenityId: this.selectedAmenityIndex,
        ...this.amenity.value
      };

      this.amenityService.updateAmenityById(updatedAmenity.amenityId, updatedAmenity).subscribe(() => {
        this.getAllAmenities();
        window.location.reload();
      });
      this.getAllAmenities();

    }
    else {
      if (this.amenity.valid) {
        const amenityData: Amenity = this.amenity.value;
        this.amenityService.createAmenity(amenityData).subscribe(() => {
          this.getAllAmenities();
          this.showForm = false;
        });
      }

    }
  }

  deleteAmenityById(id: number): void {
    this.amenityService.deleteAmenityById(id).subscribe(() => {
      this.getAllAmenities();
    });
  }

  updateAmenityById(id: number, amenity: Amenity): void {
    const amenityData: Amenity = this.amenity.value;
    this.amenityService.updateAmenityById(id, amenityData).subscribe(() => {
      this.getAllAmenities();
    });
  }

  //html codes class
  toggleDetails(index: number): void {
    this.selectedAmenityIndex = this.selectedAmenityIndex === index ? null : index;
  }
  toggleForm() {
    this.showForm = !this.showForm;
    this.resetForm();  // Ensure form is cleared when toggling
  }
  resetForm() {
  }
  editAmenity(amenity: any) {
    this.selectedAmenityIndex = amenity.amenity_id;
    this.isUpdating = true;
    this.amenity.patchValue({
      name: amenity.name,
      description: amenity.description
    });

    this.showForm = true;

  }
  deleteAmenity() {
    alert("Amenity can't delete");
  }
}
