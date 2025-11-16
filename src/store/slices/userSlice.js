import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Set user
        setUser: (state, action) => {
            state.user = action.payload;
        },

        // Get user (no action needed - use selector)
        // Clear user
        clearUser: (state) => {
            state.user = null;
        },
    },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Selector to get user
export const getUser = (state) => state.user.user;

// Export reducer
export default userSlice.reducer;