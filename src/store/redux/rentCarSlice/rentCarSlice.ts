import { createAppSlice } from "store/createAppSlice"
import { rentCarSliceState } from "./types"
import axios from "axios"

const rentCarState: rentCarSliceState = {
  cars: [],
  status: "default",
  error: undefined,
  selectedDates: null,
}

const CARS_URL = ""

export const rentCarSlice = createAppSlice({
  name: "RENT_CAR",
  initialState: rentCarState,
  reducers: create => ({
    getCar: create.asyncThunk(
      async (arg, thunkApi) => {
        try {
          const result = await axios.get(CARS_URL)
          //check returning property
          return result
        } catch (error) {
          return thunkApi.rejectWithValue(error)
        }
      },
      {
        pending: () => {},
        fulfilled: () => {},
        rejected: () => {},
      },
    ),
  }),
  selectors: {},
})
