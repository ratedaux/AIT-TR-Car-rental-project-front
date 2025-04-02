import axios from "axios";
import { createAppSlice } from "store/createAppSlice";
import { BrandsSliceState } from "./types";

const initialBrandsState: BrandsSliceState = {
    brands: [],
    status: "idle",
    error: undefined,
};
export const brandsSlice = createAppSlice({
    name: "brands",
    initialState: initialBrandsState,
    reducers: create => ({
        fetchBrands: create.asyncThunk(
            async (_, thunkApi) => {
                try {
                    const response = await axios.get<string[]>("/api/cars/brands");
                    return response.data;
                } catch (error: any) {
                    return thunkApi.rejectWithValue(error.response?.data || error.message);
                }
            },
            {
                pending: (state: BrandsSliceState) => {
                    state.error = undefined;
                    state.status = "loading";
                },
                fulfilled: (state: BrandsSliceState, action: any) => {
                    state.status = "success";
                    state.brands = action.payload;
                },
                rejected: (state: BrandsSliceState, action: any) => {
                    state.error = action.payload || "Something went wrong...";
                    state.status = "error";
                },
            },
        ),
    }),
    selectors: {
        brandsData: (state: BrandsSliceState) => state.brands,
    },
});

export const brandsActions = brandsSlice.actions;
export const brandsSelectors = brandsSlice.selectors;