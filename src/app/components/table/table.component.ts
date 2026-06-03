import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ApiService } from '../../service/api.service';

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
  private apiService = inject(ApiService);
  tableData = this.apiService.tableData;

  constructor() {
    this.apiService.getTableData();
  }

  deleteItem(id: string) {
    this.apiService.deleteItem(id);
  }
}
