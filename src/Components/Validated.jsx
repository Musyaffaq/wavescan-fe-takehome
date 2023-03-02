import { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

function Validated() {
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      fetch("https://wavescan-internship.saurabhmudgal.repl.co/success")
        .then((res) => res.json())
        .then((data) => setData(data));
    } catch (error) {
      console.error("An error occurred during fetch:", error);
    }
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={5}>Scanners found: {data.length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Scanner Name</TableCell>
            <TableCell align="center">IP Address</TableCell>
            <TableCell align="center">Scanner Speed</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, id) => {
            return (
              <TableRow key={id}>
                <TableCell>{item.scannerName}</TableCell>
                <TableCell align="center">{item.ipAddress}</TableCell>
                <TableCell align="center">{item.scannerSpeed} m/s</TableCell>
                <TableCell align="center">
                  {item.isAvailable === "true" ? "Available" : "Engaged"}
                </TableCell>
                <TableCell align="center">
                  {item.isAvailable === "true" ? (
                    <Button variant="contained">Connect</Button>
                  ) : (
                    <Button variant="contained" disabled>
                      Connect
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Validated;
