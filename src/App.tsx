import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./Layout";
import { Routes } from "./Routes";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;
