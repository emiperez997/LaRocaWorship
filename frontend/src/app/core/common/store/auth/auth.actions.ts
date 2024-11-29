import { createAction, props } from '@ngrx/store';

export const setAuthUser = createAction(
  '[Auth] Set Auth User',
  props<{ payload: any }>()
);

export const unsetAuthUser = createAction('[Auth] Unset Auth User');
