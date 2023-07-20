import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        deleteUser: (state, action) => {
            const id = action.payload.id; // Change `_id` to `id`
            state.user = state.user.filter(u => u.id !== id); // Change `_id` to `id`
          },
    }
})

export const { setUser,deleteUser } = userSlice.actions
