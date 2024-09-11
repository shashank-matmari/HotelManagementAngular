import { Component, NgModule, OnInit } from '@angular/core';
import { Roomtype } from '../../../models/roomtype';
import { RoomtypeService } from '../../../services/roomtype.service';
import { CommonModule, Location } from '@angular/common';
import { RoomtypeFormComponent } from '../roomtype-form/roomtype-form.component';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-display-roomtype',
  standalone: true,
  imports: [CommonModule, RoomtypeFormComponent,ReactiveFormsModule,RouterModule],
  templateUrl: './display-roomtype.component.html',
  styleUrls: ['./display-roomtype.component.css']  // Fixed styleUrl to styleUrls
})
export class DisplayRoomtypeComponent implements OnInit {
  roomTypes: Roomtype[] = [];
  roomtypeForm!: FormGroup;
  showForm = false;
  selectedRoomIndex: number | null = null;
  selectedRoom!: Roomtype;
  loading = false; // Loading indicator

  constructor(private roomtypeService: RoomtypeService, private fb: FormBuilder, private router: Router, private location:Location) { }

  ngOnInit(): void {

    this.getAllRoomTypes();
    this.initializeForm();
  }

  initializeForm(): void {
    this.roomtypeForm = this.fb.group({
      type_name: [''],
      description: [''],
      max_occupancy: [1],
      price_per_night: [0]
    });
  }

  async getAllRoomTypes(): Promise<void> {
    this.loading = true; // Start loading
    try {
      this.roomTypes = await this.roomtypeService.getAllRoomType();
    } catch (error) {
      console.error('Error fetching room types', error);
    } finally {
      this.loading = false; // Stop loading
    }
  }

  

  async deleteById(id: number): Promise<void> {
    this.loading = true; // Start loading
    try {
      await this.roomtypeService.deleteById(id);
      this.getAllRoomTypes();
    } catch (error) {
      console.error('Error deleting room type', error);
    } finally {
      this.loading = false; // Stop loading
    }
  }

  async updateRoomTypeById(id: number): Promise<void> {
    const roomtypeData: Roomtype = this.roomtypeForm.value;
    this.loading = true; // Start loading
    try {
      await this.roomtypeService.updateRoomTypeById(id, roomtypeData);
      this.getAllRoomTypes();
      this.showForm = false;
    } catch (error) {
      console.error('Error updating room type', error);
    } finally {
      this.loading = false; // Stop loading
    }
  }

  async onSubmit(): Promise<void> {
    if (this.roomtypeForm.valid) {
      this.loading = true; // Start loading
      try {
        const roomtype: Roomtype = this.roomtypeForm.value;
        await this.roomtypeService.createRoomType(roomtype);
        this.getAllRoomTypes();
      } catch (error) {
        console.error('Error creating room type', error);
      } finally {
        this.loading = false; // Stop loading
      }
    }
  }

  resetForm(): void {
    this.showForm = false;
    this.initializeForm();
  }

  showCreateForm(): void {
    this.showForm = true;
    this.roomtypeForm.reset();
  }

  goBack() {
    this.location.back();// Adjust the route as needed
  }

}
