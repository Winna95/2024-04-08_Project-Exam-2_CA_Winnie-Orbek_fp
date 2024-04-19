import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value: false
};

export const loggedInSlice = createSlice({
    // The name of our reducer
    name: 'loggedIn',
    // The initial state of our reducer
    initialState,
    // These are the actions that will be made available
    reducers: {
        setLoggedInState: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const { setLoggedInState} = loggedInSlice.actions;

export default loggedInSlice.reducer;
