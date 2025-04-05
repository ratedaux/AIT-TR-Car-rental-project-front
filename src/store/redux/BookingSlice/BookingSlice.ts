import { BookingData, BookingSliceState } from "./types"
import axios from "axios"
import { BookingProps } from "components/BookingComponent/types"
import { RentFormValues } from "components/BookingForm/types"
import { createAppSlice } from "store/createAppSlice"
import { userActions } from "../UserSlice/UserSlise"

const bookingInitialState: BookingSliceState = {
  bookingList: [],
  bookingListByUserId: [],
  bookingListByUser: [],
  bookingData: {
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
  },
  status: "default",
  error: undefined,
}

export const bookingSlice = createAppSlice({
  name: "BOOKINGS",
  initialState: bookingInitialState,
  reducers: create => ({
    // getBookingByBookingId: create.asyncThunk(
    //   async (id, thunkApi) => {
    //     try {
    //       const result = await axios.get(`/api/bookings/${id}`)
    //       return result.data
    //     } catch (error) {
    //       return thunkApi.rejectWithValue(error)
    //     }
    //   },
    //   {
    //     pending: (state: BookingSliceState) => {
    //       state.bookingData = {
    //         rentalStartDate: "",
    //         rentalEndDate: "",
    //         carId: "",
    //         carStatus: "",
    //         customerId: "",
    //         bookingStatus: "",
    //         totalPrice: 0,
    //         updateBookingDate: "",
    //         createBookingDate: "",
    //         id: "",
    //       }
    //       state.status = "loading"
    //       state.error = undefined
    //     },
    //     fulfilled: (state: BookingSliceState, action: any) => {
    //       state.bookingData = {
    //         rentalStartDate: action.payload.rentalStartDate,
    //         rentalEndDate: action.payload.rentalEndDate,
    //         carId: action.payload.carId,
    //         customerId: action.payload.customerId,
    //         carStatus: action.payload.carStatus,
    //         bookingStatus: action.payload.bookingStatus,
    //         totalPrice: action.payload.totalPrice,
    //         updateBookingDate: action.payload.updateBookingDate,
    //         createBookingDate: action.payload.updateBookingDate,
    //         id: action.payload.id,
    //       }

    //       state.status = "success"
    //     },
    //     rejected: (state: BookingSliceState, action: any) => {
    //       state.error = action.payload
    //       state.status = "error"
    //     },
    //   },
    // ),
    getBookingsByUser: create.asyncThunk(
      async (token: string | null, thunkApi) => {
        try {
          const result = await axios.get<BookingData[]>(
            `/api/customers/all-my-bookings`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          return result.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(error.response?.data || error.message)
        }
      },
      {
        pending: (state: BookingSliceState) => {
          // state.bookingListByUserId = []
          state.status = "loading"
          state.error = undefined
        },
        fulfilled: (state: BookingSliceState, action: any) => {
          state.bookingListByUser = action.payload
          state.status = "success"
        },
        rejected: (state: BookingSliceState, action: any) => {
          state.error = action.payload
          state.status = "error"
        },
      },
    ),
    // getBookingsByUserId: create.asyncThunk(
    //   async (id, thunkApi) => {
    //     try {
    //       const result = await axios.get<BookingData[]>(`/api/customers/all-customer-bookings/${id}`)
    //       return result.data
    //     } catch (error:any) {
    //       return thunkApi.rejectWithValue((error.response?.data || error.message))
    //     }
    //   },
    //   {
    //     pending: (state: BookingSliceState) => {
    //       // state.bookingListByUserId = []
    //       state.status = "loading"
    //       state.error = undefined
    //     },
    //     fulfilled: (state: BookingSliceState, action: any) => {
    //       state.bookingListByUserId = action.payload
    //       state.status = "success"
    //     },
    //     rejected: (state: BookingSliceState, action: any) => {
    //       state.error = action.payload
    //       state.status = "error"
    //     },
    //   },
    // ),
    getAllBookings: create.asyncThunk(
      async (token: string | null, thunkApi) => {
        try {
          const result = await axios.get<BookingData[]>(`/api/bookings`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          return result.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(error.response?.data || error.message)
        }
      },
      {
        pending: (state: BookingSliceState) => {
          //state.bookingList = []
          state.status = "loading"
          state.error = undefined
        },
        fulfilled: (state: BookingSliceState, action: any) => {
          state.bookingList = action.payload
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
        { id, newEndDate }: { id: string; newEndDate: string },
        thunkApi,
      ) => {
        try {
          const result = await axios.put(`/api/bookings/extend/${id}`, {
            id,
            newEndDate,
          })
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
          state.bookingData = action.payload
          state.status = "success"
        },
        rejected: (state: BookingSliceState, action: any) => {
          state.error = action.payload
          state.status = "error"
        },
      },
    ),
    cancelBooking: create.asyncThunk(
      async (id, thunkApi) => {
        try {
          const result = await axios.put(`/api/bookings/cancel/${id}`)
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
          state.bookingData = {
            ...state.bookingData,
            bookingStatus: "CANCELLED_BY_USER",
          }
          state.status = "success"
        },
        rejected: (state: BookingSliceState, action: any) => {
          state.error = action.payload
          state.status = "error"
        },
      },
    ),
    // activateBooking: create.asyncThunk(
    //   async (id, thunkApi) => {
    //     try {
    //       const result = await axios.put(`/api/bookings/activate/${id}`)
    //       return result.data
    //     } catch (error) {
    //       return thunkApi.rejectWithValue(error)
    //     }
    //   },
    //   {
    //     pending: (state: BookingSliceState) => {
    //       state.status = "loading"
    //       state.error = undefined
    //     },
    //     fulfilled: (state: BookingSliceState, action: any) => {
    //       state.bookingData = {
    //         ...state.bookingData,
    //         bookingStatus: "RENTED",
    //       }
    //       state.status = "success"
    //     },
    //     rejected: (state: BookingSliceState, action: any) => {
    //       state.error = action.payload
    //       state.status = "error"
    //     },
    //   },
    // ),
    closeBooking: create.asyncThunk(
      async (id, thunkApi) => {
        try {
          const result = await axios.put(`/api/close/cancel/${id}`)
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
          state.bookingData = {
            ...state.bookingData,
            bookingStatus: "CLOSED_BY_ADMIN",
          }
          state.status = "success"
        },
        rejected: (state: BookingSliceState, action: any) => {
          state.error = action.payload
          state.status = "error"
        },
      },
    ),
    createBooking: create.asyncThunk(
      async (
        { token, bookingDataForDispatch }: { token: string | null; bookingDataForDispatch: RentFormValues },
        thunkApi
      ) => {
        try {
          const result = await axios.post<BookingData>(
            `/api/bookings`, 
            bookingDataForDispatch,
            {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            },
          );
          return result.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(error.response?.data || error.message)
        }
      },
      {
        pending: (state: BookingSliceState) => {
          state.status = "loading"
          state.error = undefined
        },
        fulfilled: (state: BookingSliceState, action: any) => {
          state.bookingList.push(action.payload);
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
    // selectBookingListByUserId: (state: BookingSliceState) =>
    //   state.bookingListByUserId,
    selectBookingListByUser: (state: BookingSliceState) =>
      state.bookingListByUser,
    selectStatus: (state: BookingSliceState) => state.status,
    selectError: (state: BookingSliceState) => state.error,
  },
})

export const bookingActions = bookingSlice.actions
export const bookingSelectors = bookingSlice.selectors
