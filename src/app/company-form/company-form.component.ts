import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company, CompanyService } from '../services/company.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  company: Company = {
    id: '',
    name: '',
    exchange: '',
    ticker: '',
    isin: '',
    website: ''
  };

  isEditMode = false;
  companyId!: string; // For editing
  submitted = false; // Flag to track form submission

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('authToken') == "" || localStorage.getItem('authToken') == null){
        this.router.navigateByUrl('/')
      }
    // Check if we're in edit mode (URL contains an id)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.companyId = id;
        this.loadCompany(id);
      }
    });
  }

  // Load company data for editing
  loadCompany(id: string): void {
    this.companyService.getCompanyById(id).subscribe(company => {
      this.company = company;
    });
  }

  // Submit the form (Create or Edit)
  onSubmit(): void {
    this.submitted = true; // Mark form as submitted

    // Check if the form is valid before submitting
    if (this.isFormValid()) {
      if (this.isEditMode) {
        this.companyService.updateCompany(this.companyId, this.company).subscribe(() => {
          this.router.navigate(['/company', this.companyId]);
        });
      } else {
        this.companyService.createCompany(this.company).subscribe(() => {
          this.router.navigate(['/list']);
        });
      }
    }
  }

  // Validate the form
  isFormValid(): boolean {
    return (
      !!this.company.name && 
      !!this.company.exchange && 
      !!this.company.ticker && 
      !!this.company.isin
    );
  }

  // For validation purposes, check if field is invalid
  isFieldInvalid(field: keyof Company): boolean {
    return this.submitted && !this.company[field];
  }
}
