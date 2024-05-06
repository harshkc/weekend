import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse, JobsState } from '../../types/types';

const initialState: JobsState = {
  jobs: [],
  isLoading: false,
  hasMore: true,
  offset: 0,
  limit: 10,
  error: null,
};

export const fetchJobs = createAsyncThunk<ApiResponse, void>(
  'jobs/fetchJobs',
  async (_, { getState }) => {
    const state: JobsState = getState() as JobsState;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      limit: state.limit,
      offset: state.offset,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body,
    };

    const response = await fetch(
      'https://api.weekday.technology/adhoc/getSampleJdJSON',
      requestOptions
    );
    return response.json();
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
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
        state.error = action.payload ? action.payload.error : 'Something went wrong';
      });
  },
});

export default jobsSlice.reducer;