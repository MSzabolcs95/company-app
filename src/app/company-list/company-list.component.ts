import { Component, OnInit } from '@angular/core';
import { Company, CompanyService } from '../services/company.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyList implements OnInit {
  companies: Company[] = [];
  isLoading: boolean = true;

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe((companies) => {
      this.companies = companies;
      this.isLoading = false;
    });
  }

  goToCompanyDetails(companyId: string) {
    this.router.navigate(['/company', companyId]); // Navigate using ID
  }

  goToAddCompany(){
    this.router.navigate(['/company-form']);
  }
}
