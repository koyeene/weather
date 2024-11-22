import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../store/weatherSlice'

const store = configureStore({
   reducer: {
      weather: weatherReducer,
   },
})

export default store
