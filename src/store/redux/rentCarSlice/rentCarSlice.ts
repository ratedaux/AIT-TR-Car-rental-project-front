import { createAppSlice } from "store/createAppSlice"
import { Car, RentCarSliceState } from "./types"
import axios from "axios"

const initialCarState: RentCarSliceState = {
  car: {
    id: "",
    brand: "",
    model: "",
    year: 0,
    type: "",
    fuelType: "",
    transmissionType: "",
    carStatus: "",
    dayRentalPrice: 0,
    image: "",
  },
  cars: [],
  status: "default",
  error: undefined,
  priceRange: [20, 100],
  selectedStartDate: "",
  selectedEndDate: "",
}

const CARS_FILTER_URL = "/api/cars/filter"
const CARS_URL = "/api/cars/all"

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
            `${CARS_FILTER_URL}?${params.toString()}`,
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
    getAllCars: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const response = await axios.get<Car[]>(`${CARS_URL}`)
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
    editCar: create.asyncThunk(
      async (
        carData: {
          id: string
          brand: string
          model: string
          year: number
          type: string
          fuelType: string
          transmissionType: string
          isActive: boolean
          carStatus: string
          dayRentalPrice: number
          carImage: string
        },
        thunkApi,
      ) => {
        try {
          const response = await axios.put<Car>(CARS_URL, {
            brand: carData.brand,
            model: carData.model,
            year: carData.year,
            type: carData.type,
            fuelType: carData.fuelType,
            transmissionType: carData.transmissionType,
            isActive: carData.isActive,
            carStatus: carData.carStatus,
            dayRentalPrice: carData.dayRentalPrice,
            carImage: carData.carImage,
          })
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
          state.cars = state.cars.map(car =>
            car.id === action.payload.id ? action.payload : car,
          )
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),
    addCar: create.asyncThunk(
      async (carData: Omit<Car, "id">, thunkApi) => {
        try {
          const response = await axios.post<Car>(CARS_URL, carData)
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
          state.cars.push(action.payload)
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),
    restoreCar: create.asyncThunk(
      async (carId: string, thunkApi) => {
        try {
          const response = await axios.put<Car>(`${CARS_URL}/restore/${carId}`)
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
          state.cars.push(action.payload)
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),
    deleteCar: create.asyncThunk(
      async (carId: string, thunkApi) => {
        try {
          await axios.delete(`${CARS_URL}/delete/${carId}`)
          return carId
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
          state.cars = state.cars.filter(car => car.id !== action.payload)
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),
    uploadCarImage: create.asyncThunk(
      async ({ carId, file }: { carId: string; file: File }, thunkApi) => {
        try {
          const formData = new FormData()
          formData.append("id", carId)
          formData.append("file", file)

          const response = await axios.post<string>(
            `${CARS_URL}/upload-image`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
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
          // update URL of image in state
          const imageUrl = action.payload.split("URL: ")[1]
          state.cars = state.cars.map(car =>
            car.id === action.meta.arg.carId
              ? { ...car, carImage: imageUrl }
              : car,
          )
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Error uploading image"
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
    getCarById: create.asyncThunk(
      async (id, thunkApi) => {
        try {
          const response = await axios.get<Car>(`api/cars/${id}`)
          return response.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(error.response?.data || error.message)
        }
      },
      {
        pending: (state: RentCarSliceState) => {
          state.car = {
            id: "",
            brand: "",
            model: "",
            year: 0,
            type: "",
            fuelType: "",
            transmissionType: "",
            carStatus: "",
            dayRentalPrice: 0,
            image: "",
          }
          state.error = undefined
          state.status = "loading"
        },
        fulfilled: (state: RentCarSliceState, action: any) => {
          state.status = "success"
          state.car = action.payload
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
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
    selectAllCars: (state: RentCarSliceState) => state.cars,
    selectCarById: (state: RentCarSliceState) => state.car,
  },
})

export const rentCarActions = carsSlice.actions
export const rentCarSelectors = carsSlice.selectors
