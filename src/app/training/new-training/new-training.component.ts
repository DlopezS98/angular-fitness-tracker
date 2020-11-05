import { NgForm } from '@angular/forms';
import { Exercise } from './../../models/exercise.model';
import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/models/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercise();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
