// import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Roomtype } from '../../models/roomtype';
// import { CommonModule } from '@angular/common';
// import { RoomtypeService } from '../../services/roomtype.service';
// import { console } from 'node:inspector';

// @Component({
//   selector: 'app-roomtype-form',
//   standalone: true,
//   imports: [ReactiveFormsModule,CommonModule],
//   templateUrl: './roomtype-form.component.html',
//   styleUrl: './roomtype-form.component.css'
// })
// export class RoomtypeFormComponent implements OnInit{
//   roomtypeForm!: FormGroup;
//   roomtypes!:Roomtype
//   roomtype:Roomtype[]=[];
//   @Input() roomtypeData:Roomtype |null=null;
//   @Output() cancel = new EventEmitter<void>();
  

//   constructor(private fb: FormBuilder ,private roomtypeService:RoomtypeService) {
//     this.roomtypeForm = this.fb.group({
//       type_name: ['', Validators.required],
//       description: [''],
//       max_occupancy: [1, [Validators.required, Validators.min(1)]],
//       price_per_night: [0, [Validators.required, Validators.min(0)]]
//     });

//   }

//   // ngOnInit(): void {
//   //   //this.createForm();
//   //   this.getAllRoomType()
//   // }
//   ngOnInit(): void {
//     // this.getAllRoomType();
//     if (this.roomtypeData) {
//       this.roomtypeForm.patchValue(this.roomtypeData);
//     }


//   }
//   onSubmit(): void {
//     if (this.roomtypeForm.valid) {
//       const roomtype: Roomtype = this.roomtypeForm.value;
//       if (this.roomtypeData && this.roomtypeData.room_type_id) {
//         // Update existing room type
//         this.roomtypeService.updateRoomTypeById(this.roomtypeData.room_type_id, roomtype).subscribe({
//           next: (data) => {
//             console.log('Updated:', data);
//             this.resetForm();
//           }
//         });
//       } else {
//         // Create new room type
//         this.roomtypeService.createRoomType(roomtype).subscribe({
//           next: (data) => {
//             console.log('Created:', data);
//             this.resetForm();
//           }
//         });
//       }
//     }
//   }

//   cancelForm(): void {
//     this.cancel.emit();
//   }

//   private resetForm(): void {
//     this.roomtypeForm.reset();
//     this.cancelForm();
//   }






// }

import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roomtype } from '../../../models/roomtype';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomtypeService } from '../../../services/roomtype.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpComponent } from "../../headersAndFooters/pop-up/pop-up.component";

@Component({
  selector: 'app-roomtype-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PopUpComponent],
  templateUrl: './roomtype-form.component.html',
  styleUrls: ['./roomtype-form.component.css']
})
export class RoomtypeFormComponent implements OnInit {
  roomtypeForm!: FormGroup;
  roomType!:Roomtype;
  roomtype_id!:number
  loading = false; // Loading indicator
  isEditMode = false;

  // Popup state
  showPopup = false;
  popupTitle = '';
  popupMessage = '';

  constructor(private fb: FormBuilder, private roomtypeService: RoomtypeService, private router:Router, private location:Location, private activatedRoute:ActivatedRoute) {

    // if (typeof localStorage!=='undefined') {
    //   if(localStorage.getItem('user')==null){
    //   this.router.navigate(['/landing']);
    //   }
    // }

    this.roomtypeForm = this.fb.group({
      type_name: ['', Validators.required],
      description: [''],
      max_occupancy: [1, [Validators.required, Validators.min(1)]],
      price_per_night: [0, [Validators.required, Validators.min(0)]]
    });
  }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
          this.roomtype_id=parseInt(params.get('roomtype_id')!)
          if(this.roomtype_id){
            this.getRoomTypeById(this.roomtype_id);
          }
      }
    })
  }

  async getRoomTypeById(room_type_id: number): Promise<void> {
    this.loading = true; // Start loading
    try {
      this.roomType = await this.roomtypeService.getRoomById(room_type_id);
      if (this.roomType) {
        this.roomtypeForm.patchValue(this.roomType);
        this.isEditMode = true;
      }
    } catch (error) {
      console.error('Error fetching room type', error);
    } finally {
      this.loading = false; // Stop loading
    }
  }

  async onSubmit(): Promise<void> {
    if (this.roomtypeForm.valid) {
      this.loading = true; // Start loading
      try {
        const roomtype: Roomtype = this.roomtypeForm.value;
        if(this.isEditMode){
          this.updateRoomType(roomtype)
        }else{
          this.createRoomType(roomtype);
        }
      } catch (error) {
        this.popupTitle = 'Error!';
        this.popupMessage = 'There was a technical error. Please try again later.';
        this.showPopup = true;
      } finally {
        this.loading = false; // Stop loading
      }
    }
  }

  async createRoomType(roomtype: Roomtype): Promise<void> {
    try {
      await this.roomtypeService.createRoomType(roomtype);
      this.popupTitle = 'Added';
      this.popupMessage = 'Added new roomtype!';
      this.showPopup = true;
    } catch (error) {
      console.error('Failed to add roomtype', error);
    }
  }

  async updateRoomType(roomtype: Roomtype): Promise<void> {
    try {
      await this.roomtypeService.updateRoomTypeById(this.roomtype_id, roomtype);
      this.popupTitle = 'Update!';
      this.popupMessage = 'Updated roomtype '+this.roomtype_id+' successfully';
      this.showPopup = true;
      this.isEditMode = false;
    } catch (error) {
      console.error('Failed to update review', error);
    }
  }

  onCancel(): void {
    this.location.back()
  }

  goBack(): void {
    this.location.back(); // Adjust this to navigate to the previous route or a specific one
  } 

}
