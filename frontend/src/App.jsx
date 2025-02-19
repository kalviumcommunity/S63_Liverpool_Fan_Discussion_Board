import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PostCard from "./components/Postcard";

function App() {
  const samplePost = {
    title: "Liverpool's Latest Win!",
    content: "Liverpool defeated Manchester City 3-1 in a thrilling match at Anfield!",
    author: "LFCfan99",
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <div className="post-container">
        <PostCard post={samplePost} />
      </div>
    </Router>
  );
}

export default App;
