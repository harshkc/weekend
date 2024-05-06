import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {ApiResponse, JobsState} from "../../types/types";

import {filterData} from "../../helpers/filterCategories";

const filterInitialState = Object.keys(filterData).reduce((acc, key) => {
    acc[key] = [];
    return acc;
}, {} as {[key: string]: string[]});

const initialState: JobsState = {
    jobs: [],
    isLoading: false,
    hasMore: true,
    offset: 0,
    limit: 20,
    error: null,
    filters: filterInitialState,
    filteredJobs: [],
    isFilterApplied: false,
};

export const fetchJobs = createAsyncThunk<ApiResponse, void>("jobs/fetchJobs", async (_, {getState}) => {
    const state: JobsState = getState() as JobsState;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
        limit: state.limit,
        offset: state.offset,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
    };

    const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
    return response.json();
});

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        applyFilters(state, action: PayloadAction<{key: string; value: string[]}>) {
            const {key, value} = action.payload;
            state.filters[key] = value;
            const allFiltersEmpty = Object.values(state.filters).every((filter) => filter.length === 0);
            //if all filters are empty, then no need to filter
            state.isFilterApplied = !allFiltersEmpty;
            if(allFiltersEmpty) {
                state.filteredJobs = state.jobs;
                return;
            }
            state.filteredJobs = state.jobs.filter((job) => {
                return Object.entries(state.filters).every(([filterKey, filterValue]) => {
                    let jobValue = job[filterKey as keyof typeof job] || "";
                    jobValue = jobValue.toString();
                    if (filterValue.length === 0) {
                        return true; // If the filter value is an empty array, it means no filtering for that key
                    }
                    if (filterKey === "minExp" || filterKey === "minJdSalary") {
                        //the value can be 90+, handle this case
                        if(filterValue[0].indexOf("+") !== -1) {
                            return +jobValue >= +filterValue[0].slice(0, -1);
                        }
                        return +jobValue >= +filterValue[0];
                    }

                    return filterValue.some((filter) =>
                        jobValue.toLowerCase().includes(filter.toLowerCase())
                    ); 
                });
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                state.isLoading = false;
                state.jobs = [...state.jobs, ...action.payload.jdList];
                state.hasMore = state.jobs.length < action.payload.totalCount;
                state.offset += state.limit;
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .addCase(fetchJobs.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload ? action.payload.error : "Something went wrong";
            });
    },
});

export const {applyFilters} = jobsSlice.actions;
export default jobsSlice.reducer;
