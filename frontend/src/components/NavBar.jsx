import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // Import hook correctly


function NavBar() {
    const isLoggedIn = !!localStorage.getItem("authToken");
    const navigate = useNavigate(); 
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/login"); // Use navigate to redirect
    };

    const getMenuItems = (isLoggedIn) => {
        return isLoggedIn
            ? {
                dropDownItems: ["Logout", "Delete Account"],
                dropDownName: "Profile",
                items: ["Home", "Post"],
            }
            : { items: ["Login", "Sign Up"] };
    };

    const nav = getMenuItems(isLoggedIn);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <img
                        alt="Groupomania Logo"
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    GroupoMania
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {nav.items.map((item) => (
                            <Nav.Link
                                key={item}
                                as={Link} // Use Link here
                                to={`/${item.replace(/\s+/g, '').toLowerCase()}`} // Ensure the route is lowercase
                            >
                                {item}
                            </Nav.Link>
                        ))}
                        {nav.dropDownName && (
                            <NavDropdown title={nav.dropDownName} id="basic-nav-dropdown">
                                {nav.dropDownItems.map((item) => (
                                    <NavDropdown.Item
                                        key={item}
                                        onClick={() =>
                                            item === "Logout" ? handleLogout() : console.log(item)
                                        }
                                    >
                                        {item}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
