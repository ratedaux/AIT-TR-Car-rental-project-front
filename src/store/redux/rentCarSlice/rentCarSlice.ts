import { createAppSlice } from "store/createAppSlice"
import { Car, RentCarSliceState } from "./types"
import axios from "axios"
import { number } from "yup"

const initialCarState: RentCarSliceState = {
  cars: [],
  status: "default",
  error: undefined,
  priceRange: [20, 100],
  selectedStartDate: "",
  selectedEndDate: "",
}

const CARS_URL = "/api/cars/filter"

export const carsSlice = createAppSlice({
  name: "cars",
  initialState: initialCarState,
  reducers: create => ({
    fetchCars: create.asyncThunk(
      async (
        filters: {
          startDateTime: string
          endDateTime: string
          minPrice: number
          maxPrice: number
          brands: string[]
          bodyTypes: string[]
          fuelTypes: string[]
          transmissionTypes: string[]
        },
        thunkApi,
      ) => {
        try {
          const params = new URLSearchParams()
          params.append("startDateTime", filters.startDateTime)
          params.append("endDateTime", filters.endDateTime)
          params.append("minPrice", filters.minPrice.toString())
          params.append("maxPrice", filters.maxPrice.toString())
          filters.brands.forEach(brand => params.append("brand", brand))
          filters.bodyTypes.forEach(bodyType => params.append("type", bodyType))
          filters.fuelTypes.forEach(fuelType => params.append("fuel", fuelType))
          filters.transmissionTypes.forEach(transmissionType =>
            params.append("transmissionType", transmissionType),
          )

          const response = await axios.get<Car[]>(
            `${CARS_URL}?${params.toString()}`,
          )
          return response.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(error.response?.data || error.message)
        }
      },
      {
        pending: (state: RentCarSliceState) => {
          state.error = undefined
          state.status = "loading"
        },
        fulfilled: (state: RentCarSliceState, action: any) => {
          state.status = "success"
          state.cars = action.payload
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),
    setPriceRange: create.reducer(
      (state: RentCarSliceState, action: { payload: [number, number] }) => {
        state.priceRange = action.payload
      },
    ),
    setSelectedDates: create.reducer(
      (
        state: RentCarSliceState,
        action: { payload: { startDate: string; endDate: string } },
      ) => {
        state.selectedStartDate = action.payload.startDate
        state.selectedEndDate = action.payload.endDate
      },
    ),
  }),

  selectors: {
    carsData: (state: RentCarSliceState) => state,
    selectPriceRange: (state: RentCarSliceState) => state.priceRange,
    selectDates: (state: RentCarSliceState) => ({
      startDate: state.selectedStartDate,
      endDate: state.selectedEndDate,
    }),
  },
})

export const rentCarActions = carsSlice.actions
export const rentCarSelectors = carsSlice.selectors
