import { UIService } from './../../shared/ui.service';
import { NgForm } from '@angular/forms';
import { Exercise } from './../../models/exercise.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/models/training.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  isloading: boolean = true;
  private exerciseSubscription: Subscription;
  private LoadingSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.LoadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (loading) => {
        this.isloading = loading;
      }
    );

    this.exerciseSubscription = this.trainingService.exercisesChanges.subscribe(
      (exercises) => {
        this.exercises = exercises;
      }
    );
    
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchgetAvailableExercise();
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
    this.LoadingSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercises);
    console.log(form.value.exercises);
  }
}
