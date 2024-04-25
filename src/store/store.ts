import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todoSlice';
import itemsReducer from './itemsSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    items: itemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
