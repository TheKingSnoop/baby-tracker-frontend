import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://baby-tracker-3qng.onrender.com';
  localBaseUrl = 'http://localhost:3000';

  tableData = signal<any>(null);

  wakeUpServer() {
    return this.http.get(`${this.baseUrl}/tracker/today`); //new endpoint to be updated in the backend to wake up the server without fetching the table data
  }

  getTableData() {
    this.http.get(`${this.baseUrl}/tracker/today`).subscribe(
      (response: any) => {
        this.tableData.set(response);
      },
      (error) => {
        console.error('Error fetching data:', error);
      },
    );
  }

  getSingleEntry(id: string) {
    return this.http.get(`${this.baseUrl}/tracker/entry/${id}`);
  }

  deleteItem(id: string) {
    this.http.delete(`${this.baseUrl}/tracker/delete/${id}`).subscribe(
      (response) => {
        this.getTableData(); // Refresh the table data after deletion
      },
      (error) => {
        console.error('Error deleting item:', error);
      },
    );
  }
}
