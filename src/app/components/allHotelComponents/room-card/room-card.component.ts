import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Room } from '../../../models/room';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {

  constructor(private roomService: RoomService, private router: Router) { }

  @Input({ required: true }) room!: Room;
  isPopupOpen: boolean = false;

  openRoomDetailsPopup() {
    this.isPopupOpen = true;
  }

  closePopup(event?: MouseEvent) {
    this.isPopupOpen = false;
    if (event) {
      event.stopPropagation();
    }
  }

  bookRoom(room_id: number) {
    if (typeof localStorage !== 'undefined') {
      const bookingDetails = JSON.parse(localStorage.getItem('selectedHotel')!);
      if (bookingDetails == null) {
        this.router.navigate(['/'])
      }
      if(bookingDetails.check_in_date && bookingDetails.check_out_date){
        this.roomService.onSelect(this.room);
        this.router.navigate(['/reservation/create/form'])
      }else{
        alert("please select check in and check out dates")
      }
    }
  }

}
