import { useContext } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { UserContext } from "../contexts/UserContext";

export const Header = (): JSX.Element => {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      <Navbar color="secondary" style={{ height: "10vh" }}>
        <NavbarBrand />
        <Nav>
          <NavItem>
            <NavLink href="/get-key">Get key</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/">Encrypt</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/decrypt">Decrypt</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/register">Register</NavLink>
          </NavItem>
          {currentUser && (
            <NavItem>
              <NavLink href="/send_file">Send File</NavLink>
            </NavItem>
          )}
          {currentUser && (
            <NavItem>
              <NavLink href="/check_messages">Check Messages</NavLink>
            </NavItem>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};
