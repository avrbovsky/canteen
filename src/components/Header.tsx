import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";
import { UserContext } from "../contexts/UserContext";

export const Header = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleLogoutClicked = () => {
    setCurrentUser(undefined);
  };

  return (
    <div>
      <Navbar color="black" style={{ height: "10vh" }}>
        <NavbarBrand />
        <Nav>
          <NavItem style={{ margin: 5 }}>
            <Link to="/get-key">Get key</Link>
          </NavItem>
          <NavItem style={{ margin: 5 }}>
            <Link to="/">Encrypt</Link>
          </NavItem>
          <NavItem style={{ margin: 5 }}>
            <Link to="/decrypt">Decrypt</Link>
          </NavItem>
          {!currentUser && (
            <NavItem style={{ margin: 5 }}>
              <Link to="/login">Login</Link>
            </NavItem>
          )}
          {!currentUser && (
            <NavItem style={{ margin: 5 }}>
              <Link to="/register">Register</Link>
            </NavItem>
          )}
          {true && (
            <NavItem style={{ margin: 5 }}>
              <Link to="/send_file">Send File</Link>
            </NavItem>
          )}
          {true && (
            <NavItem style={{ margin: 5 }}>
              <Link to="/check_messages">Check Messages</Link>
            </NavItem>
          )}
          {currentUser && <Button onClick={handleLogoutClicked}>Logout</Button>}
        </Nav>
      </Navbar>
    </div>
  );
};
