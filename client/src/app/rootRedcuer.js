import { combineReducers } from "@reduxjs/toolkit"
import authRuducer from "../features/authSlice"
import { authApi } from "../features/api/authApi"

const rootReducer = combineReducers({
  [authApi.reducerPath]:authApi.reducer,
  auth:authRuducer
})
export default rootReducer;