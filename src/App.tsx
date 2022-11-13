import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './Layout';
import { Routes } from './Routes';
import { useState, createContext, useContext } from "react";

function App() {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  )
}

export default App;
