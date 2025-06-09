import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./modules/counterStore"
import metaReducer from "./modules/meta"

export default configureStore({
    reducer: {
        counter: counterReducer,
        meta: metaReducer,
    },
})