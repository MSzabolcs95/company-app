import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
 
@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  name:string = ''
  email:string = ''
  password:string = ''
  confirmPassword:string = ''
  isSubmitting:boolean = false
  validationErrors:any = []
  
  constructor(public userAuthService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
      this.router.navigateByUrl('/list');
    }
  }
  
  registerAction() {
    this.isSubmitting = true;
   
    this.userAuthService.register(this.email, this.password).subscribe((success: any) => {
        if (success) {
          console.log('Registration successful!');
          this.router.navigateByUrl('/');
        } else {
          console.log('Registration failed!');
        }
      }, (error: any) => {
        console.error('Registration error:', error);
      });

    this.isSubmitting = false;
    
  }
}