import './App.css';
import {Box, TextField, Typography, Button, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper} from "@mui/material"
import Axios from "axios"
import * as React from 'react'

function App() {
  const [getData, setGetData] = React.useState(true)
  const [rows, setRows] = React.useState([])
  const [name, setName] = React.useState('')
  const [position, setPosition] = React.useState('')

  const [avgTemp, setAvgTemp] = React.useState(0)

  async function addEmployee() {
    await Axios.post("/api/employees", {name, position})
    .then(() => setGetData(true));
  } 

  async function editEmployee() {
    await Axios.put("/api/employees/" + name, {position: position})
    .then(() => setGetData(true));
  } 

  async function deleteEmployee() {
    await Axios.delete("/api/employees/" + name)
    .then(() => setGetData(true));
  } 

  React.useEffect(() => {
    async function getEmployees() {
      await Axios.get("/api/employees")
      .then(data => {
        setRows(data.data.data)
      });
    } 

    async function getTemp() {
      await Axios.get("https://function-1-v3czts2vfa-de.a.run.app/")
      .then(res => {
        const temps = res.data;
        setAvgTemp(temps.reduce((a, b) => a + b)/temps.length);
      });
    } 

    getEmployees()
    getTemp()
    setGetData(false)
  }, [getData])

  return (
    <Box>
      <Typography variant='h2'>
        Welcome to your employee app
      </Typography>
      <Typography variant="h6">
        The average temperature of Singapore now is {avgTemp}
      </Typography>
      <TextField label='Name' onChange={e => setName(e.target.value)}> </TextField>
      <TextField label='position' onChange={e => setPosition(e.target.value)}> </TextField>
      <Button onClick={addEmployee}>Add</Button>
      <Button onClick={editEmployee}>Edit</Button>
      <Button onClick={deleteEmployee}>Delete</Button>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Position</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}

export default App;
