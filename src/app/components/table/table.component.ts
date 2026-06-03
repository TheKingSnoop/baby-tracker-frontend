import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface TrackerItem {
  time: string;
  feed: string;
  pee: boolean;
  poo: boolean;
}

interface TodayTrackerResponse {
  _id: string;
  date: string;
  trackerData: TrackerItem[];
  __v: number;
}

@Component({
  selector: 'app-table',
  imports: [NgFor],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  todayData: any;

  constructor(private http: HttpClient) {
    this.getTableData();
  }

  getTableData() {
    this.http.get("https://baby-tracker-3qng.onrender.com/tracker/today").subscribe(
      (response: any) => {
        this.todayData = response;
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }
}
