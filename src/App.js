import React, { useState, useEffect } from 'react';
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Paper,
} from '@mui/material';

const regions = ['US1', 'US2', 'EU1', 'EU2', 'SEA'];

function App() {
  const [region, setRegion] = useState('EU1');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlayers = async (region) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.gtacnr.net/cnr/players?serverId=${region}`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      setPlayers(data);
    } catch (err) {
      setError(err.message);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers(region);
  }, [region]);

  const handleChange = (event) => {
    setRegion(event.target.value);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <FormControl fullWidth>
        <InputLabel id="region-select-label">Region</InputLabel>
        <Select
          labelId="region-select-label"
          value={region}
          label="Region"
          onChange={handleChange}
        >
          {regions.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error" style={{ marginTop: '2rem' }}>
          {error}
        </Typography>
      ) : (
        <>
          <Typography variant="h6" style={{ marginTop: '2rem' }}>
            Total Players: {players.length}
          </Typography>
          <Paper style={{ marginTop: '1rem' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.Uid}>
                    <TableCell>{player.Username.Username}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}
    </Container>
  );
}

export default App;
