// src/pages/TeamManagement.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchTeams, addTeam } from '../features/teams/teamsSlice';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TeamManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const teams = useSelector((state: RootState) => state.teams.teams);
  const loading = useSelector((state: RootState) => state.teams.loading);
  const error = useSelector((state: RootState) => state.teams.error);

  const [teamName, setTeamName] = useState('');
  const [mascot, setMascot] = useState('');
  const [colors, setColors] = useState('');
  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const addOrUpdateTeam = () => {
    if (editingTeam) {
      // Update team logic
    } else {
      dispatch(addTeam({ name: teamName, mascot, colors: colors.split(',') }));
      resetForm();
    }
  };

  const editTeam = (team) => {
    setTeamName(team.name);
    setMascot(team.mascot);
    setColors(team.colors.join(', '));
    setEditingTeam(team);
  };

  const deleteTeam = (id) => {
    // Delete team logic
  };

  const resetForm = () => {
    setTeamName('');
    setMascot('');
    setColors('');
    setEditingTeam(null);
  };

  return (
    <Container>
      <h1>Team Management</h1>
      <form noValidate autoComplete="off">
        <TextField label="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} fullWidth />
        <TextField label="Mascot" value={mascot} onChange={(e) => setMascot(e.target.value)} fullWidth />
        <TextField label="Colors (comma separated)" value={colors} onChange={(e) => setColors(e.target.value)} fullWidth />
        <Button variant="contained" color="primary" onClick={addOrUpdateTeam}>
          {editingTeam ? 'Update Team' : 'Add Team'}
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
              <TableCell>Mascot</TableCell>
              <TableCell>Colors</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map(team => (
              <TableRow key={team._id}>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.mascot}</TableCell>
                <TableCell>{team.colors.join(', ')}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editTeam(team)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteTeam(team._id)}>
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

export default TeamManagement;
