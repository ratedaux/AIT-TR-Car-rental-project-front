
import { BookingSliceState } from "./types"
import axios from "axios"
import { BookingProps } from "components/BookingComponent/types"
import { createAppSlice } from "store/createAppSlice"

const bookingInitialState: BookingSliceState = {
  bookingList: [],
  bookingListByUserId: [],
  bookingData:  {
    rentalStartDate: "",
    rentalEndDate: "",
    carId: "",
    carStatus:"",
    customerId: "",
    bookingStatus: "",
    totalPrice: 0,
    updateBookingDate: "",
    createBookingDate: "",
    id: "",
  },
  status: "default",
  error: undefined,
}

export const bookingSlice = createAppSlice({
  name: "BOOKINGS",
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
            carId: "",
            carStatus: "",
            customerId: "",
            bookingStatus: "",
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
            carId: action.payload.carId,
            customerId: action.payload.customerId,
            carStatus: action.payload.carStatus,
            bookingStatus: action.payload.bookingStatus,
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
    getBookingsByUser: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const result = await axios.get(
            `/api/customers/all-my-bookings`,
          )
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
          state.bookingList = action.payload.bookingList
          state.status = "success"
        },
        rejected: (state: BookingSliceState, action: any) => {
          state.error = action.payload
          state.status = "error"
        },
      },
    ),
    extendBooking: create.asyncThunk(
      async (
        { id, updatedData }: { id: string; updatedData: BookingProps },
        thunkApi,
      ) => {
        try {
          const result = await axios.put(
            `/api/bookings/extend/${id}`,
            updatedData
          )
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

    cancelBooking: create.asyncThunk(
      async (
        { id, updatedData }: { id: string; updatedData: BookingProps },
        thunkApi,
      ) => {
        try {
          const result = await axios.put(
            `/api/bookings/cancel/${id}`,
            updatedData,
          )
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

    restoreBooking: create.asyncThunk(
      async (
        { id, updatedData }: { id: string; updatedData: BookingProps },
        thunkApi,
      ) => {
        try {
          const result = await axios.put(
            `/api/bookings/restore/${id}`,
            updatedData,
          )
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

    createBooking: create.asyncThunk(
      async (values, thunkApi) => {
        try {
          const result = await axios.post(
            `/api/bookings`,
            values,
          )
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
          state.bookingData = action.payload.values
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
    selectBookingListByUser: (state: BookingSliceState) =>
      state.bookingListByUserId,
    selectStatus: (state: BookingSliceState) => state.status,
    selectError: (state: BookingSliceState) => state.error,
  },
})

export const bookingActions = bookingSlice.actions
export const bookingSelectors = bookingSlice.selectors
