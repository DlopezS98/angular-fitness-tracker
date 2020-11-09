import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Exercise } from '../models/exercise.model';
import {
  TrainingActions,
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
} from '../actions/training.actions';
import * as RootReducerStore from './app.reducer';

export interface TrainingState {
  AvailableExercises: Exercise[];
  FinishedExercises: Exercise[];
  ActiveTraining: Exercise;
}

export interface State extends RootReducerStore.State {
  Training: TrainingState;
}

const InitialState: TrainingState = {
  AvailableExercises: [],
  FinishedExercises: [],
  ActiveTraining: null,
};

export function trainingReducer(state = InitialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        AvailableExercises: action.payload,
      };

    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        FinishedExercises: action.payload,
      };

    case START_TRAINING:
      return {
        ...state,
        ActiveTraining: {
          ...state.AvailableExercises.find((ex) => ex.id === action.payload),
        },
      };

    case STOP_TRAINING:
      return {
        ...state,
        ActiveTraining: null,
      };

    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');
export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.AvailableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.FinishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.ActiveTraining);
export const getIstraining = createSelector(getTrainingState, (state: TrainingState) => state.ActiveTraining != null)
