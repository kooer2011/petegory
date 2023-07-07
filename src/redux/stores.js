import {configureStore} from '@reduxjs/toolkit'
import { alerSlice } from './features/alertSlice'
import { userSlice } from './features/userSlice'

export default configureStore({
    reducer:{
        alerts: alerSlice.reducer,
        user: userSlice.reducer,
    }
})