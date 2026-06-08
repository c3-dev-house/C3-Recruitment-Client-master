import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DevForm from "./pages/DevForm";
import { Submission } from "./pages/Submission";
import PageNotFound from "./pages/PageNotFound";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Legal from "./pages/Legal";
import DataProcessingAgreement from "./pages/DataProcessingAgreement";
import ListingsPage from "./pages/recruitment/ListingsPage";
import JobDetailPage from "./pages/recruitment/JobDetailPage";
import SignupPage from "./pages/recruitment/SignupPage";
import ApplyPage from "./pages/recruitment/ApplyPage";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/apply/:jobId" element={<ApplyPage />} />
          <Route path="/form" element={<DevForm />} />
          <Route path="/submit/:id" element={<Submission />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/dataProcessing" element={<DataProcessingAgreement />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
