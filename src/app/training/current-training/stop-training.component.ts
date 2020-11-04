import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: ` <div class="dialog-container">
    <h1 fxLayoutAlign="center" mat-dialog-title>Are you sure?</h1>
    <mat-dialog-content fxLayoutAlign="center">
      <p>You al ready got {{ passedData.progress }}%</p>
    </mat-dialog-content>
    <mat-dialog-actions fxLayoutGap="20px" fxLayoutAlign="center">
      <button mat-raised-button [mat-dialog-close]="true" color="primary">
        Yes
      </button>
      <button mat-raised-button [mat-dialog-close]="false" color="accent">
        No
      </button>
    </mat-dialog-actions>
  </div>`,
  styleUrls: ['./current-training.component.css'],
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
