import { createReducer, on } from '@ngrx/store';
import { setAuthUser, unsetAuthUser } from './auth.actions';
import { User } from '../../../services/users/user.entity';

export const authFeatureName = 'auth';

export interface AuthState {
  authUser: User | null;
}

const initialState: AuthState = {
  authUser: null,
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(setAuthUser, (state, { payload }) => ({ ...state, authUser: payload })),
  on(unsetAuthUser, (state) => ({ ...state, authUser: null }))
);
