import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { BookingSliceState } from "./types"
import axios from "axios"

// const getUserId()=>{}

const bookingInitialState: BookingSliceState = {
  bookingList: [],
  bookingListByUserId: [],
  bookingData: {
    rentalStartDate: "",
    rentalEndDate: "",
    carStatus: "",
    totalPrice: 0,
    updateBookingDate: "",
    createBookingDate: "",
    id: 0,
  },
  status: "default",
  error: undefined,
}

export const bookingSlice = createSlice({
  name: "BookingSLice",
  initialState: bookingInitialState,
  reducers:
   create => ({
    getBooking: 
    create.asyncThunk(
      async (arg, thunkApi) => {
        try {
          const result = await axios.get(`/api/bookings`)
          return result.data
        } catch (error) {
          return thunkApi.rejectWithValue(error)
        }
      },
      {
        pending: (state: BookingSliceState) => {
          state.bookingData = {
            rentalStartDate: "",
            rentalEndDate: "",
            carStatus: "",
            totalPrice: 0,
            updateBookingDate: "",
            createBookingDate: "",
            id: 0,
          }
          state.status = "loading"
          state.error = undefined
        },
        fulfilled: (state: BookingSliceState, action: any) => {
          
          state.bookingData = {
            rentalStartDate: action.payload.rentalStartDate,
            rentalEndDate: action.payload.rentalEndDate,
            carStatus: action.payload.carStatus,
            totalPrice: action.payload.totalPrice,
            updateBookingDate: action.payload.updateBookingDate,
            createBookingDate: action.payload.updateBookingDate,
            id: action.payload.id,
          }
          
          state.status = "success"
        },
        rejected: (state: BookingSliceState, action: any) => {
          state.error = action.payload
          state.status = "error"
        },
      },
    ),
  }),

  selectors: {
    booking: (state: BookingSliceState) => state,
  },
})

export const bookingActions = bookingSlice.actions
export const bookingSelectors = bookingSlice.selectors
