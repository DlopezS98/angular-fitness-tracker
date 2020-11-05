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
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    // this.exercises = this.trainingService.fetchgetAvailableExercise();
    // this.trainingService.fetchgetAvailableExercise().subscribe((exercise) => {
    //   this.exercises = exercise;
    //   console.log(exercise)
    // });
    this.exerciseSubscription = this.trainingService.exercisesChanges.subscribe(
      (exercises) => {
        this.exercises = exercises;
      });
    this.trainingService.fetchgetAvailableExercise();
  }

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercises);
    console.log(form.value.exercises);
  }
}
