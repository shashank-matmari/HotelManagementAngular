import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Route, Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Login } from '../../../models/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup
  isVisible:boolean=false

  constructor(private fb:FormBuilder, private route:Router, private loginService:LoginService){
    this.loginForm=fb.group({
      user_name:['',[Validators.required]],
      password:['',[Validators.required]]
    })
    
  }
  async onLogin() {
    if (this.loginForm.valid) {
      const { user_name, password } = this.loginForm.value;
      try {
        const data = await this.loginService.login(user_name, password);
        if (data) {
          this.loginService.setData(data);
          this.loginForm.reset();
          this.route.navigate(["/"]);
        } else {
          this.isVisible = true;
        }
      } catch (error) {
        // Handle any errors here
        console.error('Login failed', error);
        this.isVisible = true;
      }
    }
  }
  
  

  closePopup(){
    this.isVisible = false;
  }


}
