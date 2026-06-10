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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

const DD_MM_YYYY_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

interface TrackerItem {
  _id: string;
  time: string;
  feed: string;
  amount: string;
  pee: boolean;
  poo: boolean;
  comment: string;
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
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, NgIf, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  templateUrl: './table.component.html',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: DD_MM_YYYY_FORMATS },
  ],
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
    'comment',
    'delete',
  ];
  dataSource = this.tableData()?.payload?.trackerData;

  selectedDate: Date | null = null;
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
    //format the date to dd-mm-yyyy
    const formattedDate = this.selectedDate
      ? `${this.selectedDate.getDate().toString().padStart(2, '0')}-${(this.selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${this.selectedDate.getFullYear()}`
      : null;
    console.log('Formatted date:', formattedDate);

    if (formattedDate) { 
      this.apiService.getTableDataByDate(formattedDate);
    } else {
      this.apiService.getTableData();
    }
  }

  getTodaysData() {
    this.apiService.getTableData();
  }

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
