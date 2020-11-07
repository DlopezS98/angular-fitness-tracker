import { UIService } from '../shared/ui.service';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class TrainingService {
  constructor(private db: AngularFirestore, private uiService: UIService) {}

  exerciseChange = new Subject<Exercise>();
  exercisesChanges = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  exerciseCollection: AngularFirestoreCollection<Exercise>;
  exerciseDoc: AngularFirestoreDocument<Exercise>;
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private firebaseSubs: Subscription[] = [];
  // exercises: Observable<Exercise[]>;

  fetchgetAvailableExercise() {
    this.uiService.loadingStateChanged.next(true);
    this.exerciseCollection = this.db.collection('availableExercises');
    this.firebaseSubs.push(
      this.exerciseCollection
        .snapshotChanges()
        .pipe(
          map((actions) => {
            //  throw new Error("an error has ocurred");
            return actions.map((a) => {
              const data = a.payload.doc.data() as Exercise;
              data.id = a.payload.doc.id;
              return data;
            });
          })
        )
        .subscribe(
          (exercise: Exercise[]) => {
            this.uiService.loadingStateChanged.next(false);
            this.availableExercises = exercise;
            this.exercisesChanges.next([...this.availableExercises]);
          },
          (error) => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.ShowSnackBar(
              'Fetching exercises failed, please try again later',
              'Close',
              {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
                panelClass: ['mat-toolbar', 'mat-primary'],
              }
            );
            this.exercisesChanges.next(null);
          }
        )
    );
    return this.availableExercises.slice();
    // return this.exercises;
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/'+selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(
      (obj) => obj.id === selectedId
    );
    this.exerciseChange.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExcercises() {
    this.firebaseSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next([...exercises]);
          console.log(exercises);
        })
    );
  }

  cancelAllSubscriptions() {
    this.firebaseSubs.forEach((subs) => subs.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    //Si la colección no esta credad en firebase la creara automáticamente
    this.db.collection('finishedExercises').add(exercise);
  }
}
