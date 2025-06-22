import Navbar from "./components/Nav1";
import News from "./components/New1";
import PostNews from "./components/PostNews"
import LocalNews from "./components/LocalNews";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes> <Route path="/" element = {<News category = "general"/>}/> </Routes>
        <Routes> <Route path="/sports" element = {<News category = "sports"/>}/> </Routes>
        <Routes> <Route path="/health" element = {<News category = "health"/>}/> </Routes>
        <Routes> <Route path="/entertainment" element = {<News category = "entertainment"/>}/> </Routes>
        <Routes> <Route path="/science" element = {<News category = "science"/>}/> </Routes>
        <Routes> <Route path="/technology" element = {<News category = "technology"/>}/> </Routes>
        <Routes> <Route path="/business" element = {<News category = "business"/>}/> </Routes>
        <Routes> <Route path="/post-news" element = {<PostNews/>}/> </Routes>
        <Routes> <Route path="/local-news" element = {<LocalNews/>}/> </Routes>
        
      </Router>
    </div>
  );
}

export default App;
