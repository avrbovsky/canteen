import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./Layout";
import { Routes } from "./Routes";
import { useState, createContext, useContext } from "react";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Layout>
          <Routes />
        </Layout>
      </UserProvider>
    </Router>
  );
}

export default App;
