import { createSlice } from "@reduxjs/toolkit";
import { eventDataProp } from "../../features/events/types/event";

const initialState = {
    favourite: [] as eventDataProp[],
};

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        addFavourite(state, actions) {
            state.favourite.push(actions.payload);
        },

        removeFavourite(state, actions) {
            const updatedList = state.favourite.filter((items: eventDataProp) => items.event_date_id !== actions.payload);
            state.favourite = updatedList;
        },
    },
});

export const { addFavourite, removeFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;