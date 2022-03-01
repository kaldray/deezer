import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="bottom" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Container>
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-center"
            >
              <Nav className="flex justify-content-center">
                <Link className="m-2" to="/">
                  Accueil
                </Link>
                <Link className="m-2" to="/favorite">
                  Favorite
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
