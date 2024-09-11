import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user!:User
  showSearch = false;
  searchQuery: string = '';
  showProfileDropdown: boolean = false;
  role!:string

  constructor(private hotelService:HotelService, private router:Router, private loginService:LoginService){}

  ngOnInit(){
    if(typeof localStorage!=='undefined'){
      const role=localStorage.getItem('role')
      const user=JSON.parse(localStorage.getItem('user')!)
      if(role && user){
        this.user=user
        this.role=role
      }
    }
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  searchHotels() {
    this.hotelService.setSearchQuery(this.searchQuery); // Set the search query in the service
  }

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  logout() {
    // Clear user session or token from localStorage
    localStorage.clear();
    this.router.navigate(['/landing']);
  }

}

