import {
  AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from '../actions/auth.actions';

export interface State {
  IsAuthenticated: boolean;
}

const InitialState: State = {
  IsAuthenticated: false,
};

export function authReducer(state = InitialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        IsAuthenticated: true,
      };

    case SET_UNAUTHENTICATED:
      return {
        IsAuthenticated: false,
      };

    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.IsAuthenticated;
