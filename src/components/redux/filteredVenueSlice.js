import {createSlice} from '@reduxjs/toolkit';

/**
 * Initial state for the filteredVenues reducer.
 * @type {{
 *   value: Array,
 *   loading: boolean,
 *   errorLoading: string
 * }}
 */
const initialState = {
    value: [],
    loading: false,
    errorLoading: ''
};

/**
 * Redux slice for managing filteredVenues state.
 * @type {import("@reduxjs/toolkit").Slice}
 */
export const filteredVenuesSlice = createSlice({
    // The name of our reducer
    name: 'filteredVenues',
    // The initial state of our reducer
    initialState,
    // These are the actions that will be made available
    reducers: {
        /**
         * Action for setting loading state.
         * @param {Object} state - Current state.
         * @param {boolean} action.payload - Payload containing loading state.
         */
        setLoadingState: (state, action) => {
            state.loading = action.payload;
        },
        /**
         * Action for setting error loading state.
         * @param {Object} state - Current state.
         * @param {string} action.payload - Payload containing error message.
         */
        setErrorLoading: (state, action) => {
            state.errorLoading = action.payload;
        },
        /**
         * Action for setting new filtered venues.
         * @param {Object} state - Current state.
         * @param {Array} action.payload - Payload containing new filtered venues.
         */
        setNewFilteredVenues: (state, action) => {
            state.value = action.payload;
        },
        /**
         * Action for resetting state.
         * @param {Object} state - Current state.
         */
        reset: (state) => {
            state.value = [];
        }
    },
});

/**
 * Export actions from filteredVenuesSlice.
 * @type {{
 *   setNewFilteredVenues: Function,
 *   reset: Function,
 *   setLoadingState: Function,
 *   setErrorLoading: Function
 * }}
 */
export const {setNewFilteredVenues, reset, setLoadingState, setErrorLoading} = filteredVenuesSlice.actions;

/**
 * Export the reducer from filteredVenuesSlice.
 * @type {import("@reduxjs/toolkit").Reducer}
 */
export default filteredVenuesSlice.reducer;

