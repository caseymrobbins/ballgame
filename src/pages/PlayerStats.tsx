// src/pages/PlayerStats.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchPlayers, addPlayer } from '../features/players/playersSlice';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function PlayerStats() {
  const dispatch = useDispatch<AppDispatch>();
  const players = useSelector((state: RootState) => state.players.players);
  const loading = useSelector((state: RootState) => state.players.loading);
  const error = useSelector((state: RootState) => state.players.error);
  const teams = useSelector((state: RootState) => state.teams.teams);

  const [playerName, setPlayerName] = useState('');
  const [position, setPosition] = useState('');
  const [teamId, setTeamId] = useState('');
  const [stats, setStats] = useState('');
  const [editingPlayer, setEditingPlayer] = useState(null);

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchTeams());
  }, [dispatch]);

  const addOrUpdatePlayer = () => {
    if (editingPlayer) {
      // Update player logic
    } else {
      dispatch(addPlayer({ name: playerName, position, team: teamId, stats: JSON.parse(stats) }));
      resetForm();
    }
  };

  const editPlayer = (player) => {
    setPlayerName(player.name);
    setPosition(player.position);
    setTeamId(player.team);
    setStats(JSON.stringify(player.stats));
    setEditingPlayer(player);
  };

  const deletePlayer = (id) => {
    // Delete player logic
  };

  const resetForm = () => {
    setPlayerName('');
    setPosition('');
    setTeamId('');
    setStats('');
    setEditingPlayer(null);
  };

  return (
    <Container>
      <h1>Player Stats</h1>
      <form noValidate autoComplete="off">
        <TextField label="Player Name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} fullWidth />
        <TextField label="Position" value={position} onChange={(e) => setPosition(e.target.value)} fullWidth />
        <FormControl fullWidth>
          <InputLabel id="team-select-label">Team</InputLabel>
          <Select labelId="team-select-label" value={teamId} onChange={(e) => setTeamId(e.target.value)}>
            {teams.map(team => (
              <MenuItem key={team._id} value={team._id}>{team.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Stats (JSON format)" value={stats} onChange={(e) => setStats(e.target.value)} fullWidth />
        <Button variant="contained" color="primary" onClick={addOrUpdatePlayer}>
          {editingPlayer ? 'Update Player' : 'Add Player'}
        </Button>
        <Button variant="contained" onClick={resetForm}>
          Cancel
        </Button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Stats</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map(player => (
              <TableRow key={player._id}>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.team?.name}</TableCell>
                <TableCell>{JSON.stringify(player.stats)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editPlayer(player)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deletePlayer(player._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PlayerStats;
