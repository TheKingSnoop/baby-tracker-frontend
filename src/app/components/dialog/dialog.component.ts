import { Component,inject } from '@angular/core';
import {
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ApiService } from '../../service/api.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../service/helper.service';

interface value {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog',
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, NgIf, MatProgressSpinnerModule, MatButtonModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatIconModule, MatSlideToggleModule, FormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<{ id: string }>(MAT_DIALOG_DATA);
  readonly helperService = inject(HelperService);
  private apiService = inject(ApiService);

  entryData: any = null;

    feeds: value[] = [
    { value: 'Formula', viewValue: 'Formula' },
    { value: 'Breastfed', viewValue: 'Breastfed' },
  ];

  amounts: value[] = [
    { value: 'Light', viewValue: 'Light' },
    { value: 'Medium', viewValue: 'Medium' },
    { value: 'Heavy', viewValue: 'Heavy' },
    { value: '60ml', viewValue: '60ml' },
    { value: '90ml', viewValue: '90ml' },
  ];

  constructor(private http: HttpClient) {
    this.apiService.getSingleEntry(this.data.id).subscribe(
      (response) => {
        this.entryData = response;
        console.log('Entry data:', this.entryData);
      },
      (error) => {
        console.error('Error fetching entry data:', error);
      }
    );
  }

  updateEntry() {
    const payload = this.entryData?.payload;

    if (!payload) {
      return;
    }

    this.http.put(`${this.apiService.baseUrl}/tracker/update/${this.data.id}`, payload).subscribe(
      (response) => {
        console.log('Entry updated successfully:', response);
        this.dialogRef.close(true); // Close the dialog and indicate success
        this.apiService.getTableData(); // Refresh the table data after updating the entry
        const message = 'Entry updated successfully! ✅';
        this.helperService.openSnackBar(message);
      },
      (error) => {
        console.error('Error updating entry:', error);
        const message = 'Failed to update entry. Please try again. 😞';
        this.helperService.openSnackBar(message);
      }
    );
  }
}
