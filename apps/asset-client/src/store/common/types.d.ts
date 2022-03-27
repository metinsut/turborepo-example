declare module 'RootTypes' {
  import { Action, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

  type ActionType = Action<string>;
  type StoreExtraArgument = null;

  export type RootState = ReturnType<typeof import('../rootReducer').default>;
  export type AppThunk<ReturnType = Promise<void>> = ThunkAction<
    ReturnType,
    RootState,
    StoreExtraArgument,
    ActionType
  >;

  export type StoreThunkDispatch = ThunkDispatch<RootState, StoreExtraArgument, ActionType>;
}
