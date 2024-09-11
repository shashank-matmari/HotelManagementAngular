import { NgModule, Component, HostListener, OnInit } from '@angular/core';
import { SingleReservationComponent } from '../single-reservation/single-reservation.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Reservation } from '../../../models/reservation';
import { ReservationService } from '../../../services/reservation.service';


@Component({
  selector: 'app-all-reservations',
  standalone: true,
  imports: [SingleReservationComponent, CommonModule, RouterModule, MatCardModule, FormsModule],
  templateUrl: './all-reservations.component.html',
  styleUrl: './all-reservations.component.css'
})
export class AllReservationsComponent implements OnInit {

  searchQuery!: number
  selectedIndex!: number
  reservations: Reservation[] = []
  filteredReservations: Reservation[] = []
  checkInDate: string = '';
  checkOutDate: string = '';

  constructor(private reservationService: ReservationService, private router: Router, private http: HttpClient, private activatedRoutes: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoutes.paramMap.subscribe({
      next: (params) => {
        const email = params.get('email')
        if (email) {
          this.getReservationsByEmail(email);
        } else {
          // throw new Error('Method not implemented.');
          this.reservationService.getAllReservationsWithRoom().subscribe({
            next: (data) => {
              this.reservations = data
              // console.log(data)
            }
          })
        }
      }
    })
  }

  getReservationsByEmail(email:string){
    this.reservationService.getReservationByUserEmail(email).subscribe({
      next:(data)=>{
        this.reservations=data;
      }
    })
  }

  updateReservation(reservationId: number) {
    this.router.navigate(['api/reservation/update', reservationId])
  }

  changeSelectedIndex(data: number) {
    this.selectedIndex = data
  }

  @HostListener('click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (event.target && !(event.target as HTMLElement).closest('.card')) {
      this.resetAllCards();
    }
  }

  resetAllCards(): void {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      (card as HTMLElement).classList.remove('hovered');
    });
  }

  filterByDates() {
    if (this.checkInDate && this.checkOutDate) {
      this.reservationService.getReservationsByDateRange(this.checkInDate, this.checkOutDate).subscribe(data => {
        if (data)
          this.reservations = data
        // console.log(data)

      });
    } else {
      alert('No filtered results in range between given dates')
      this.ngOnInit()
    }
  }

}
