import { configureStore } from '@reduxjs/toolkit';
import filteredVenuesReducer from '../components/redux/filteredVenueSlice'
import loggedInReducer from '../components/redux/loggedInSlice'

export const store = configureStore({
    reducer: {
        filteredVenues: filteredVenuesReducer,
        loggedIn: loggedInReducer
    },
});