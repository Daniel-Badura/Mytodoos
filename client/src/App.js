import React from "react";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import TodoState from "./context/todo/todoState";

const App = () => {
  return (
    <TodoState>
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Switch>
          </div>
        </>
      </Router>
    </TodoState>
  );
};

export default App;
