import { UIService } from '../shared/ui.service';
import { Exercise } from '../models/exercise.model';
import { Store } from '@ngrx/store';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromTraining from '../reducers/training.reducer';
import * as UI from '../actions/ui.actions';
import * as trainingActions from '../actions/training.actions';

@Injectable()
export class TrainingService {
  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  exerciseCollection: AngularFirestoreCollection<Exercise>;
  exerciseDoc: AngularFirestoreDocument<Exercise>;
  private firebaseSubs: Subscription[] = [];
  // exercises: Observable<Exercise[]>;

  fetchgetAvailableExercise() {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
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
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(
              new trainingActions.SetAvailableTrainings(exercise)
            );
          },
          (error) => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
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
          }
        )
    );
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/'+selectedId).update({lastSelected: new Date()});
    this.store.dispatch(new trainingActions.StartTraining(selectedId));
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1)) //retrive changes only once
      .subscribe((exercise) => {
        this.addDataToDatabase({
          ...exercise,
          date: new Date(),
          state: 'completed',
        });
        this.store.dispatch(new trainingActions.StopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1)) //retrive changes only once
      .subscribe((exercise) => {
        this.addDataToDatabase({
          ...exercise,
          duration: exercise.duration * (progress / 100),
          calories: exercise.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled',
        });
        this.store.dispatch(new trainingActions.StopTraining());
      });
  }

  fetchCompletedOrCancelledExcercises() {
    this.firebaseSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(
            new trainingActions.SetFinishedTrainings(exercises)
          );
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
