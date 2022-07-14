import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/loading/landing";
import Home from "./components/home/home";
import Search from "./components/search/search";
import PageNotFound from "./components/pageNotFound/notFound";
import "./App.css";
import Create from "./components/create/create";

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="home/detail/:id" element={<Search/>} />
          <Route path="home/detail" element={<Search/>} />
          <Route path="home/create" element={<Create/>} />
          <Route path="home" element={<Home/>} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
