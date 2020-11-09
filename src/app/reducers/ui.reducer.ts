import { UIActions, START_LOADING, STOP_LOADING } from '../actions/ui.actions';

export interface State {
  IsLoading: boolean;
}

const InitialState: State = {
  IsLoading: false,
};

export function uiReducer(state = InitialState, action: UIActions) {
  switch (action.type) {
    case START_LOADING:
      return {
        IsLoading: true,
      };

    case STOP_LOADING:
      return {
        IsLoading: false,
      };

    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.IsLoading;
