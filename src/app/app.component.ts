import { Component, OnInit } from '@angular/core';
import { Company, CompanyService } from './services/company.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  companies: Company[] = [];

  constructor(private companyService: CompanyService, private router: Router) {

}
}