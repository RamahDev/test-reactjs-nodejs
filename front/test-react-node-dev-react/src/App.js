import React from "react";
import "./styles/App.css";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" exact component={<Home/>} />
          <Route path="/About" exact component={<About/>} />
          <Route path="/Contact" exact component={<Contact/>} />
          <Route path="/Menu" exact component={<Menu/>} />
          <Route component={NotFound} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
