import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { WeeklyOverviewComponent } from './components/weekly-overview/weekly-overview.component';
import {NgIf} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormComponent, TableComponent, NgIf, MatProgressSpinnerModule, HeaderComponent, WeeklyOverviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'baby-tracker';
  isLoading = true;

  constructor(private apiService: ApiService) {
    this.apiService.wakeUpServer().subscribe(() => {
      this.isLoading = false;
    });
  }
}
