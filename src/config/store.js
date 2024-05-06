import {configureStore} from '@reduxjs/toolkit';
import filteredVenuesReducer from '../components/redux/filteredVenueSlice'
import loggedInReducer from '../components/redux/loggedInSlice'

/**
 * Redux store configuration.
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 */
export const store = configureStore({
    reducer: {
        filteredVenues: filteredVenuesReducer,
        loggedIn: loggedInReducer
    },
});