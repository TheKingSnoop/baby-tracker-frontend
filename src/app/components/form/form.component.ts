import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  private apiService = inject(ApiService);

  date: string;
  time: string;
  feed: string;
  amount: string;
  pee: boolean;
  poo: boolean;

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
        },
        (error) => {
          console.error('Error submitting data:', error);
        },
      );
  }
}
