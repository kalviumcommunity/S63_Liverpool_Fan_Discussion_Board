import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AddEntity from "./pages/AddEntity";
import UpdateEntity from "./pages/UpdateEntity";
import EntityList from "./components/EntityList";
import Post from "./pages/Post"; // Importing Post component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add" element={<Post />} /> {/* Route for adding posts */}
        <Route path="/add-entity" element={<AddEntity />} /> {/* Route for adding SQL entities */}
        <Route path="/entities" element={<EntityList />} />
        <Route path="/update/:id" element={<UpdateEntity />} />
        <Route path="/posts" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
