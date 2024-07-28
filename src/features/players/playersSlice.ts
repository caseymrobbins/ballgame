// src/features/players/playersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Player {
  _id: string;
  name: string;
  position: string;
  team: string;
  stats: Record<string, any>;
}

interface PlayersState {
  players: Player[];
  loading: boolean;
  error: string | null;
}

const initialState: PlayersState = {
  players: [],
  loading: false,
  error: null,
};

export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async () => {
  const response = await axios.get('http://localhost:5000/players');
  return response.data;
});

export const addPlayer = createAsyncThunk('players/addPlayer', async (player: Omit<Player, '_id'>) => {
  const response = await axios.post('http://localhost:5000/players', player);
  return response.data;
});

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPlayer.fulfilled, (state, action) => {
        state.players.push(action.payload);
      });
  },
});

export default playersSlice.reducer;
