import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import MainForm from "./Components/MainForm";
import Validated from "./Components/Validated";
import Header from "./Components/Header";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<MainForm />} />
            <Route path="/validated" element={<Validated />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
