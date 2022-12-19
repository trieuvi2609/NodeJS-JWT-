import { createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser : null,
            isFetching : false,
            error: false
        },
        register: {
            isFetch: false,
            error: false,
            success : false
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false;
            state.register.error = false
            state.register.success = true
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success= false
        },
        logOut: (state) => {
            state.login.currentUser = null
        }
    }

})

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart, 
    registerSuccess,
    registerFailed,
    logOut
} = authSlice.actions;

export default authSlice.reducer