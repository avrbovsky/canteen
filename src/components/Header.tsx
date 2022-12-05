import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";
import { UserContext } from "../contexts/UserContext";

export const Header = (): JSX.Element => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogoutClicked = () => {
    setCurrentUser(undefined);
    navigate("/login");
  };

  return (
    <div>
      <Navbar color="black" style={{ height: "10vh" }}>
        <NavbarBrand />
        <Nav>
          {/* <NavItem style={{ margin: 5 }}>
            <Link to="/get-key">Get key</Link>
          </NavItem> */}
          {/* <NavItem style={{ margin: 5 }}>
            <Link to="/">Encrypt</Link>
          </NavItem> */}
          {/* <NavItem style={{ margin: 5 }}>
            <Link to="/decrypt">Decrypt</Link>
          </NavItem> */}
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
          {currentUser && (
            <NavItem style={{ margin: 5 }}>
              <Link to="/send_file">Send File</Link>
            </NavItem>
          )}
          {currentUser && (
            <NavItem style={{ margin: 5 }}>
              <Link to="/check_messages">Check Messages</Link>
            </NavItem>
          )}
          {currentUser && !currentUser.isManager && (
            <NavItem style={{ margin: 5 }}>
              <Link to="/menu">Menu</Link>
            </NavItem>
          )}
          {currentUser && (
            <NavItem style={{ margin: 5 }}>
              <Link to="/foods">Foods</Link>
            </NavItem>
          )}
          {currentUser?.isManager && (
            <NavItem style={{ margin: 5 }}>
              <Link to="/addFood">Add Food</Link>
            </NavItem>
          )}
          {currentUser?.isManager && (
            <NavItem style={{ margin: 5 }}>
              <Link to="/addMenu">Add Menu</Link>
            </NavItem>
          )}
          {currentUser?.isManager && (
            <NavItem style={{ margin: 5 }}>
              <Link to="/addCredit">Add Credit</Link>
            </NavItem>
          )}
          {currentUser && <Button onClick={handleLogoutClicked}>Logout</Button>}
        </Nav>
      </Navbar>
    </div>
  );
};
