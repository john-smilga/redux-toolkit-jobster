import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';
const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

export const createJob = createAsyncThunk('job/createJob', createJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

export const editJob = createAsyncThunk('job/editJob', editJobThunk);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job Created');
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job Modified...');
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
