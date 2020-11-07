import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
  constructor(private snackbar: MatSnackBar){}
  loadingStateChanged = new Subject<boolean>();

  ShowSnackBar(message: string, action: string, configuration: MatSnackBarConfig){
    this.snackbar.open(message, action, configuration);
  }
}
