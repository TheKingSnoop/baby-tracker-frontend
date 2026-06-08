import { Injectable, inject } from '@angular/core';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
 private _snackBar = inject(MatSnackBar);

 constructor() { }
 
  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3 * 1000,
      data: { message },
    });
  }
}
