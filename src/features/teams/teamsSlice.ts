// src/features/teams/teamsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Team {
  _id: string;
  name: string;
  mascot: string;
  colors: string[];
}

interface TeamsState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamsState = {
  teams: [],
  loading: false,
  error: null,
};

export const fetchTeams = createAsyncThunk('teams/fetchTeams', async () => {
  const response = await axios.get('http://localhost:5000/teams');
  return response.data;
});

export const addTeam = createAsyncThunk('teams/addTeam', async (team: Omit<Team, '_id'>) => {
  const response = await axios.post('http://localhost:5000/teams', team);
  return response.data;
});

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTeam.fulfilled, (state, action) => {
        state.teams.push(action.payload);
      });
  },
});

export default teamsSlice.reducer;
