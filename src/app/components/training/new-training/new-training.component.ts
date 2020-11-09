import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Exercise } from '../../../models/exercise.model';
import { TrainingService } from '../../../services/training.service';
import * as fromTraining from '../../../reducers/training.reducer';
import * as RootReducerStore from '../../../reducers/app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isloading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.isloading$ = this.store.select(RootReducerStore.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchgetAvailableExercise();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercises);
  }
}
