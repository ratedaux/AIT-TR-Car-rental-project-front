import { createAppSlice } from "store/createAppSlice"
import {
  bodyTypesSliceState,
  brandsSliceState,
  Car,
  rentCarSliceState,
} from "./types"
import axios from "axios"

const initialCarState: rentCarSliceState = {
  cars: [],
  status: "default",
  error: undefined,
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
        pending: (state: rentCarSliceState) => {
          state.error = undefined
          state.status = "loading"
        },
        fulfilled: (state: rentCarSliceState, action: any) => {
          state.status = "success"
          state.cars = action.payload
        },
        rejected: (state: rentCarSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),
  }),
  selectors: {
    carsData: (state: rentCarSliceState) => state,
  },
})

const initialBrandsState: brandsSliceState = {
  brands: [],
  status: "idle",
  error: undefined,
}
export const brandsSlice = createAppSlice({
  name: "brands",
  initialState: initialBrandsState,
  reducers: create => ({
    fetchBrands: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const response = await axios.get<string[]>("/api/cars/brands")
          return response.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(error.response?.data || error.message)
        }
      },
      {
        pending: (state: brandsSliceState) => {
          state.error = undefined
          state.status = "loading"
        },
        fulfilled: (state: brandsSliceState, action: any) => {
          state.status = "success"
          state.brands = action.payload
        },
        rejected: (state: brandsSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),
  }),
  selectors: {
    brandsData: (state: brandsSliceState) => state.brands,
  },
})

const initialBodyTypesState: bodyTypesSliceState = {
  bodyTypes: [],
  status: "idle",
  error: undefined,
}
export const bodyTypesSlice = createAppSlice({
  name: "bodyTypes",
  initialState: initialBodyTypesState,
  reducers: create => ({
    fetchTypes: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const response = await axios.get<string[]>("/api/cars/types")
          return response.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(error.response?.data || error.message)
        }
      },
      {
        pending: (state: bodyTypesSliceState) => {
          state.error = undefined
          state.status = "loading"
        },
        fulfilled: (state: bodyTypesSliceState, action: any) => {
          state.status = "success"
          state.bodyTypes = action.payload
        },
        rejected: (state: bodyTypesSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),
  }),
  selectors: {
    bodyTypesData: (state: bodyTypesSliceState) => state.bodyTypes,
  },
})
export const rentCarActions = carsSlice.actions
export const rentCarSelectors = carsSlice.selectors

export const brandsActions = brandsSlice.actions
export const brandsSelectors = brandsSlice.selectors

export const bodyTypesActions = bodyTypesSlice.actions
export const bodyTypesSelectors = bodyTypesSlice.selectors
