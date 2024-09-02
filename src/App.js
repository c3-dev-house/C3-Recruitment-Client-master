import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DevForm from "./pages/DevForm";
import { Submission } from "./pages/Submission";
import PageNotFound from "./pages/PageNotFound";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes className="bg-slate-200">
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<DevForm />} />
          <Route path="/submit/:id" element={<Submission />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
