import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getUsersStart: (state) => {
            state.users.isFetching = true
        },
        getUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers= action.payload
        },
        getUserFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true
        }
    }
})
export const {getUserFailed, getUserSuccess, getUsersStart} = userSlice.actions

export default userSlice.reducer