import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

interface Feed {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form',
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  private apiService = inject(ApiService);

  date: string;
  time: string;
  feed: string;
  amount: string;
  pee: boolean;
  poo: boolean;

  selectedValue!: string;

  feeds: Feed[] = [
    { value: 'Formula', viewValue: 'Formula' },
    { value: 'Breastfed', viewValue: 'Breastfed' },
  ];

  amounts: Feed[] = [
    { value: 'Light', viewValue: 'Light' },
    { value: 'Medium', viewValue: 'Medium' },
    { value: 'Heavy', viewValue: 'Heavy' },
    { value: '60ml', viewValue: '60ml' },
    { value: '90ml', viewValue: '90ml' },
  ];

  constructor(private http: HttpClient) {
    this.date = this.getCurrentDate();
    this.time = '';
    this.feed = '';
    this.amount = '';
    this.pee = false;
    this.poo = false;
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.time = `${hours}:${minutes}`;
  }

  togglePee() {
    this.pee = !this.pee;
  }

  togglePoo() {
    this.poo = !this.poo;
  }

  //select feed type

  submit() {
    // Here you can handle the form submission, e.g., send the data to a server or store it locally
    console.log('Form submitted:', {
      date: this.date,
      time: this.time,
      feed: this.feed,
      amount: this.amount,
      pee: this.pee,
      poo: this.poo,
    });

    this.http
      .post('https://baby-tracker-3qng.onrender.com/tracker/add', {
        date: this.date,
        trackerData: {
          time: this.time,
          feed: this.feed,
          amount: this.amount,
          pee: this.pee,
          poo: this.poo,
        },
      })
      .subscribe(
        (response) => {
          console.log('Data submitted successfully:', response);
          this.apiService.getTableData();
          this.time = '';
          this.feed = '';
          this.amount = '';
          this.pee = false;
          this.poo = false;
        },
        (error) => {
          console.error('Error submitting data:', error);
        },
      );
  }
}
