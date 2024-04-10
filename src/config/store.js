import { configureStore } from '@reduxjs/toolkit';
import filteredVenuesReducer from '../components/venue/filteredVenueSlice'

export const store = configureStore({
    reducer: {
        filteredVenues: filteredVenuesReducer
    },
});