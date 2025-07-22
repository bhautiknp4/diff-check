import { configureStore } from '@reduxjs/toolkit';
import zipSlice from './zipSlice';
import diffSlice from './diffSlice';
import settingsSlice from './settingsSlice';

export const store = configureStore({
  reducer: {
    zip: zipSlice,
    diff: diffSlice,
    settings: settingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['zip/setFiles', 'zip/setProgress'],
        ignoredPaths: ['zip.files'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;