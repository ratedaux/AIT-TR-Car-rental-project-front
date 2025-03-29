import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { BookingSliceState } from "./types"
import axios from "axios"
import { EditBookingFormProps } from "components/EditBookingDetailsForm/types"

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
    id: "",
  },
  status: "default",
  error: undefined,
}

export const bookingSlice = createSlice({
  name: "BookingSLice",
  initialState: bookingInitialState,
  reducers: create => ({
    getBookingByBookingId: create.asyncThunk(
      async (id, thunkApi) => {
        try {
          const result = await axios.get(`/api/bookings/${id}`)
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
            id: "",
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
    getBookingsByUserId: create.asyncThunk(
      async (userId, thunkApi) => {
        try {
          const result = await axios.get(`/api/customers/all-bookings-id/${userId}`)
          return result.data
        } catch (error) {
          return thunkApi.rejectWithValue(error)
        }
      },
      {
        pending: (state: BookingSliceState) => {
          state.bookingListByUserId = []
          state.status = "loading"
          state.error = undefined
        },
        fulfilled: (state: BookingSliceState, action: any) => {
          state.bookingListByUserId = action.payload.bookingListByUserId
          state.status = "success"
        },
        rejected: (state: BookingSliceState, action: any) => {
          state.error = action.payload
          state.status = "error"
        },
      },
    ),
    getAllBookings: create.asyncThunk(
      async (__, thunkApi) => {
        try {
          const result = await axios.get(`/api/bookings`)
          return result.data
        } catch (error) {
          return thunkApi.rejectWithValue(error)
        }
      },
      {
        pending: (state: BookingSliceState) => {
          state.bookingList = []
          state.status = "loading"
          state.error = undefined
        },
        fulfilled: (state: BookingSliceState, action: any) => {
          state.bookingListByUserId = action.payload.bookingList
          state.status = "success"
        },
        rejected: (state: BookingSliceState, action: any) => {
          state.error = action.payload
          state.status = "error"
        },
      },
    ),
    extendBooking: create.asyncThunk(
      async ({ id, updatedData }: { id: string, updatedData: EditBookingFormProps }, thunkApi) => {
        try {
          const result = await axios.put(`/api/bookings/extend/${id}`, updatedData)
          return result.data
        } catch (error) {
          return thunkApi.rejectWithValue(error)
        }
      },
      {
        pending: (state: BookingSliceState) => {
          state.status = "loading"
          state.error = undefined
        },
        fulfilled: (state: BookingSliceState, action: any) => {
          state.bookingData = action.payload.updatedData
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
   
    selectBookingData: (state: BookingSliceState) => state.bookingData,
    selectBookingList: (state: BookingSliceState) => state.bookingList,
    selectBookingListByUserId: (state: BookingSliceState) => state.bookingListByUserId,
    selectStatus: (state: BookingSliceState) => state.status,
    selectError: (state: BookingSliceState) => state.error,
    
  },
})

export default bookingSlice.reducer;
export const bookingActions = bookingSlice.actions
export const bookingSelectors = bookingSlice.selectors
