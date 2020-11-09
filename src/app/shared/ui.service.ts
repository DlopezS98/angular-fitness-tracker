import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class UIService {
  constructor(private snackbar: MatSnackBar){}

  ShowSnackBar(message: string, action: string, configuration: MatSnackBarConfig){
    this.snackbar.open(message, action, configuration);
  }
}
