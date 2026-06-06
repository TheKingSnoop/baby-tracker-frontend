import { Component, inject } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
interface TrackerItem {
  time: string;
  feed: string;
  amount: string;
  pee: boolean;
  poo: boolean;
}

interface TodayTrackerResponse {
  _id: string;
  date: string;
  trackerData: TrackerItem[];
  __v: number;
}

// export interface TrackerData {
//   time: string;
//   feed: string;
//   amount: string;
//   pee: boolean;
//   poo: boolean;
//   delete: boolean;
// }

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  tableData: any;

  constructor(private apiService: ApiService) {}

  getTableData() {
    this.apiService.getTableData().subscribe(
      (response: any) => {
        this.tableData = response;
      },
      (error) => {
        console.error('Error fetching table data:', error);
      },
    );
  }

  displayedColumns: string[] = [
    'time',
    'feed',
    'amount',
    'pee',
    'poo',
    'delete',
  ];
  // dataSource = this.tableData()?.payload?.trackerData || []; // is this still needed?

  deleteItem(id: string) {
    this.apiService.deleteItem(id);
  }

  refreshTable() {
    this.getTableData();
  }

  ngOnInit() {
    this.getTableData();
  }
}
