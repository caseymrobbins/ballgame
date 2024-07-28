// src/pages/TeamManagement.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TeamManagement() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [mascot, setMascot] = useState('');
  const [colors, setColors] = useState('');
  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/teams')
      .then(response => setTeams(response.data))
      .catch(error => console.error(error));
  }, []);

  const addOrUpdateTeam = () => {
    if (editingTeam) {
      axios.put(`http://localhost:5000/teams/${editingTeam._id}`, { name: teamName, mascot, colors: colors.split(',') })
        .then(response => {
          setTeams(teams.map(team => team._id === editingTeam._id ? response.data : team));
          setEditingTeam(null);
          resetForm();
        })
        .catch(error => console.error(error));
    } else {
      axios.post('http://localhost:5000/teams', { name: teamName, mascot, colors: colors.split(',') })
        .then(response => {
          setTeams([...teams, response.data]);
          resetForm();
        })
        .catch(error => console.error(error));
    }
  };

  const editTeam = (team) => {
    setTeamName(team.name);
    setMascot(team.mascot);
    setColors(team.colors.join(', '));
    setEditingTeam(team);
  };

  const deleteTeam = (id) => {
    axios.delete(`http://localhost:5000/teams/${id}`)
      .then(() => {
        setTeams(teams.filter(team => team._id !== id));
      })
      .catch(error => console.error(error));
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
