import axios from "axios";
import { createAppSlice } from "store/createAppSlice";
import { BodyTypesSliceState } from "./types";

const initialBodyTypesState: BodyTypesSliceState = {
    bodyTypes: [],
    status: "idle",
    error: undefined,
};
export const bodyTypesSlice = createAppSlice({
    name: "bodyTypes",
    initialState: initialBodyTypesState,
    reducers: create => ({
        fetchTypes: create.asyncThunk(
            async (_, thunkApi) => {
                try {
                    const response = await axios.get<string[]>("/api/cars/types");
                    return response.data;
                } catch (error: any) {
                    return thunkApi.rejectWithValue(error.response?.data || error.message);
                }
            },
            {
                pending: (state: BodyTypesSliceState) => {
                    state.error = undefined;
                    state.status = "loading";
                },
                fulfilled: (state: BodyTypesSliceState, action: any) => {
                    state.status = "success";
                    state.bodyTypes = action.payload;
                },
                rejected: (state: BodyTypesSliceState, action: any) => {
                    state.error = action.payload || "Something went wrong...";
                    state.status = "error";
                },
            },
        ),
    }),
    selectors: {
        bodyTypesData: (state: BodyTypesSliceState) => state.bodyTypes,
    },
});

export const bodyTypesActions = bodyTypesSlice.actions;
export const bodyTypesSelectors = bodyTypesSlice.selectors;