import {createSlice} from '@reduxjs/toolkit';

/**
 * Initial state for the loggedIn reducer.
 * @type {{ value: boolean }}
 */
const initialState = {
    value: false
};

/**
 * Redux slice for managing loggedIn state.
 * @type {import("@reduxjs/toolkit").Slice}
 */
export const loggedInSlice = createSlice({
    // The name of our reducer
    name: 'loggedIn',
    // The initial state of our reducer
    initialState,
    // These are the actions that will be made available
    reducers: {
        /**
         * Action for setting the logged-in state.
         * @param {Object} state - Current state.
         * @param {boolean} action.payload - Payload containing the new logged-in state.
         */
        setLoggedInState: (state, action) => {
            state.value = action.payload;
        }
    },
});

/**
 * Export actions from loggedInSlice.
 * @type {{ setLoggedInState: Function }}
 */
export const {setLoggedInState} = loggedInSlice.actions;

/**
 * Export the reducer from loggedInSlice.
 * @type {import("@reduxjs/toolkit").Reducer}
 */
export default loggedInSlice.reducer;

