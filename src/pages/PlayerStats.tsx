// src/pages/PlayerStats.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function PlayerStats() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [position, setPosition] = useState('');
  const [teamId, setTeamId] = useState('');
  const [stats, setStats] = useState('');
  const [editingPlayer, setEditingPlayer] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/players')
      .then(response => setPlayers(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/teams')
      .then(response => setTeams(response.data))
      .catch(error => console.error(error));
  }, []);

  const addOrUpdatePlayer = () => {
    if (editingPlayer) {
      axios.put(`http://localhost:5000/players/${editingPlayer._id}`, { name: playerName, position, team: teamId, stats: JSON.parse(stats) })
        .then(response => {
          setPlayers(players.map(player => player._id === editingPlayer._id ? response.data : player));
          setEditingPlayer(null);
          resetForm();
        })
        .catch(error => console.error(error));
    } else {
      axios.post('http://localhost:5000/players', { name: playerName, position, team: teamId, stats: JSON.parse(stats) })
        .then(response => {
          setPlayers([...players, response.data]);
          resetForm();
        })
        .catch(error => console.error(error));
    }
  };

  const editPlayer = (player) => {
    setPlayerName(player.name);
    setPosition(player.position);
    setTeamId(player.team._id);
    setStats(JSON.stringify(player.stats));
    setEditingPlayer(player);
  };

  const deletePlayer = (id) => {
    axios.delete(`http://localhost:5000/players/${id}`)
      .then(() => {
        setPlayers(players.filter(player => player._id !== id));
      })
      .catch(error => console.error(error));
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
