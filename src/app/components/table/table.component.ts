import { Component, inject } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HelperService } from '../../service/helper.service';

interface TrackerItem {
  _id: string;
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
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, NgIf],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  private apiService = inject(ApiService);
  private helperService = inject(HelperService);
  readonly dialog = inject(MatDialog);

  tableData = this.apiService.tableData;

  constructor() {
    this.apiService.getTableData();
  }
  
  displayedColumns: string[] = [
    'time',
    'feed',
    'amount',
    'pee',
    'poo',
    'delete',
  ];
  dataSource = this.tableData()?.payload?.trackerData;

  deleteItem(id: string) {
    this.apiService.deleteItem(id);
    const message = 'Entry deleted successfully! 🗑️';
    this.helperService.openSnackBar(message);
  }

  openDialog(id: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id },
    });
  }
}
