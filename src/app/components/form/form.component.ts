import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  date: string;
  time: string;
  feed: string;
  pee: boolean;
  poo: boolean;

  constructor() {
    this.date = this.getCurrentDate();
    this.time = '';
    this.feed = '';
    this.pee = false;
    this.poo = false;
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
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
      pee: this.pee,
      poo: this.poo
    });
  }
}