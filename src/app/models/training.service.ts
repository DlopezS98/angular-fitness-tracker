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
  constructor(private db: AngularFirestore) {}

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
    this.exerciseCollection = this.db.collection('availableExercises');
    this.firebaseSubs.push(
      this.exerciseCollection
        .snapshotChanges()
        .pipe(
          map((actions) => {
            return actions.map((a) => {
              const data = a.payload.doc.data() as Exercise;
              data.id = a.payload.doc.id;
              return data;
            });
          })
        )
        .subscribe((exercise: Exercise[]) => {
          this.availableExercises = exercise;
          this.exercisesChanges.next([...this.availableExercises]);
        })
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

  cancelAllSubscription() {
    this.firebaseSubs.forEach((subs) => subs.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    //Si la colección no esta credad en firebase la creara automáticamente
    this.db.collection('finishedExercises').add(exercise);
  }
}
