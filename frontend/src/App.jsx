import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AddEntity from "./pages/AddEntity";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add" element={<AddEntity />} />
      </Routes>
    </Router>
  );
}

export default App;
