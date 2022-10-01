import { Action,
  configureStore,
  ThunkAction
} from "@reduxjs/toolkit";
import rootReducer, { RootState } from './rootReducer';
import logger from "redux-logger";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    { serializableCheck: false }
  ).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers:(defaultEnhancers) => [...defaultEnhancers]
})

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
export default  store;