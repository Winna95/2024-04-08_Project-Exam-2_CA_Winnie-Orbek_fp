import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value: [],
    loading: false,
    errorLoading: ''
};

export const filteredVenuesSlice = createSlice({
    // The name of our reducer
    name: 'filteredVenues',
    // The initial state of our reducer
    initialState,
    // These are the actions that will be made available
    reducers: {
        setLoadingState: (state, action) => {
            state.loading = action.payload;
        },
        setErrorLoading: (state, action) => {
            state.errloading = action.payload;
        },
        setNewFilteredVenues: (state, action) => {
            state.value = action.payload;
        },
       reset: (state) => {
          state.value = [];

       }
    },
});

export const { setNewFilteredVenues, reset, setLoadingState, setErrorLoading } = filteredVenuesSlice.actions;

export default filteredVenuesSlice.reducer;
