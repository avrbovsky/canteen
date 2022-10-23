import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export const Header = (): JSX.Element => {
  return (
    <div>
        <Navbar color='secondary' style={{height:'10vh'}}>
            <NavbarBrand href="/">Home</NavbarBrand>
            <Nav>
                <NavItem>
                    <NavLink href="/encrypt">Encrypt</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/decrypt">Decrypt</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    </div>
  );
};