import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CompanyService, Company } from '../services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterOutlet, CommonModule],
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company!: Company;
  isLoading: boolean = true;
  constructor(private route: ActivatedRoute, private companyService: CompanyService, private router: Router) {}

  ngOnInit() {
    const companyId = this.route.snapshot.paramMap.get('id');
    console.log('Navigating to Company ID:', companyId);

    if (companyId) {
      this.companyService.getCompanyById(companyId).subscribe({
        next: (data) => {
          this.company = data;
          console.log('Company details loaded:', this.company); 
          this.isLoading = false;
        },
        error: (error) => console.error('Error fetching company details:', error)
      });
    }
  }

  goToCompanyEdit(companyId: string) {
    this.router.navigate(['/company-form', companyId]); // Navigate using ID
  }
}
