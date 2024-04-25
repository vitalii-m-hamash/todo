import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../models/Todo';

interface ItemsState {
  items: Todo[];
}

const initialState: ItemsState = {
  items: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Todo>) {
      state.items.push(action.payload);
    },
  },
});

export const { addItem } = itemsSlice.actions;
export default itemsSlice.reducer;
