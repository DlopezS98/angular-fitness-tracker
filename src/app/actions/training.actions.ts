import { Exercise } from './../models/exercise.model';
import { Action } from '@ngrx/store';

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Training';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Training';
export const START_TRAINING = '[Training] Start Traininig';
export const STOP_TRAINING = '[Training] Stop Training';

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: String) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions =
  | SetAvailableTrainings
  | SetFinishedTrainings
  | StartTraining
  | StopTraining;
