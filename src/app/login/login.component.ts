import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
 
 
@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  email:string = ''
  password:string = ''
  isSubmitting:boolean = false
  validationErrors:Array<any> = []
 
  constructor(public userAuthService: AuthService, private router: Router) {}
 
  ngOnInit(): void {
    if(localStorage.getItem('authToken') != "" && localStorage.getItem('authToken') != null){
      this.router.navigateByUrl('/list')
    }
  }
 
  loginAction() {
    this.isSubmitting = true;
    
    this.userAuthService.login(this.email, this.password).subscribe(success => {
        if (success) {
          console.log('Login successful!');
          this.isSubmitting = false;
          this.router.navigateByUrl('/list')
          // Navigate to another page, update UI, etc.
        } else {
          this.isSubmitting = false;
          console.log('Login failed!');
          // Show error message, reset form, etc.
        }
      }, error => {
        this.isSubmitting = false;
        console.error('Login error:', error);
      });
      
   
  }
}