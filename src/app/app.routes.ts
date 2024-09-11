import { Routes } from '@angular/router';
import { HomeComponent } from './components/allHotelComponents/home/home.component';
import { LandingComponent } from './components/headersAndFooters/landing/landing.component';
import { HotelDetailsComponent } from './components/allHotelComponents/hotel-details/hotel-details.component';
import { ReviewFormComponent } from './components/review/review-form/review-form.component';
import { ReviewDisplayComponent } from './components/review/review-display/review-display.component';
import { DisplayRoomtypeComponent } from './components/roomType/display-roomtype/display-roomtype.component';
import { RoomtypeFormComponent } from './components/roomType/roomtype-form/roomtype-form.component';
import { AmenityComponent } from './components/amenity/amenity.component';
import { AllReservationsComponent } from './components/reservationAndPayment/all-reservations/all-reservations.component';
import { CreateReservationComponent } from './components/reservationAndPayment/create-reservation/create-reservation.component';
import { PaymentComponent } from './components/reservationAndPayment/payment/payment.component';
import { AllPaymentsComponent } from './components/reservationAndPayment/all-payments/all-payments.component';
import { ReservationDetailsComponent } from './components/reservationAndPayment/reservation-details/reservation-details.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './components/headersAndFooters/signup/signup.component';
import { ProfileComponent } from './components/headersAndFooters/profile/profile.component';
import { HotelFormComponent } from './components/allHotelComponents/hotel-form/hotel-form.component';
import { HotelsListComponent } from './components/allHotelComponents/hotels-list/hotels-list.component';
import { SingleHotelComponent } from './components/allHotelComponents/single-hotel/single-hotel.component';
import { RoleGuard } from './role.guard';

export const routes: Routes = [
    // { 
    //     path: 'feedback', 
    //     children: [
    //         { path: 'feedback/create', component: ReviewFormComponent, canActivate:[AuthGuard] },
    //         { path: 'feedback/edit/:review_id', component: ReviewFormComponent, canActivate:[AuthGuard] },
    //         { path: 'feedback/all', component: ReviewDisplayComponent, canActivate:[AuthGuard] }
    //     ]
    // },
    // { 
    //     path: 'roomtype', 
    //     children: [
    //         { path: 'roomtype/all', component: DisplayRoomtypeComponent, canActivate:[AuthGuard] },
    //         { path: 'roomtype/create', component: RoomtypeFormComponent, canActivate:[AuthGuard] },
    //         { path: 'roomtype/edit/:roomtype_id', component: RoomtypeFormComponent, canActivate:[AuthGuard] }
    //     ]
    // },
    { path: '', component: HomeComponent , canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'hotel/all', component: HotelsListComponent, canActivate: [AuthGuard,RoleGuard] },
    {path:'hotel/create',component:HotelFormComponent,canActivate:[AuthGuard,RoleGuard]},
    { path: 'hotel/details/:hotel_id', component: SingleHotelComponent, canActivate: [AuthGuard,RoleGuard] },
    { path: 'hotel/:hotel_id', component: HotelDetailsComponent, canActivate: [AuthGuard] },
    { path: 'landing', component: LandingComponent },
    { path: 'feedback/create/:reservation_id', component: ReviewFormComponent, canActivate: [AuthGuard] },
    { path: 'feedback/edit/:review_id', component: ReviewFormComponent, canActivate: [AuthGuard] },
    { path: 'feedback/all', component: ReviewDisplayComponent, canActivate: [AuthGuard] },
    { path: 'roomtype/all', component: DisplayRoomtypeComponent, canActivate: [AuthGuard,RoleGuard] },
    { path: 'roomtype/create', component: RoomtypeFormComponent, canActivate: [AuthGuard,RoleGuard] },
    { path: 'roomtype/edit/:roomtype_id', component: RoomtypeFormComponent, canActivate: [AuthGuard,RoleGuard] },
    {
        path: 'amenities/all', component: AmenityComponent, canActivate: [AuthGuard,RoleGuard]
    },
    { path: 'reservation/all', component: AllReservationsComponent, canActivate: [AuthGuard,RoleGuard] },
    { path: 'reservation/:email', component: AllReservationsComponent, canActivate: [AuthGuard] },
    { path: 'reservation/create/form', component: CreateReservationComponent, canActivate: [AuthGuard] },
    { path: 'reservation/update/:room_id', component: CreateReservationComponent, canActivate: [AuthGuard,RoleGuard] },
    { path: 'reservation/details/:reservationId', component: ReservationDetailsComponent, canActivate: [AuthGuard] },
    { path: 'payment/:reservation_id', component: PaymentComponent, canActivate: [AuthGuard] },
    { path: 'payments/all', component: AllPaymentsComponent, canActivate: [AuthGuard,RoleGuard] },
    { path: 'payments/:email', component: AllPaymentsComponent, canActivate: [AuthGuard] },
    {path:'signup',component:SignupComponent},
    {path:'profile',component:ProfileComponent, canActivate:[AuthGuard]}
];
