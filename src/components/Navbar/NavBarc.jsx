import { useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Badge } from "react-bootstrap";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import { useCart } from "../context/CartContext";
import "./NavBar.css";

function Navbarc() {
  const [showLogin, setShowLogin] = useState(false);

  const { cartItems } = useCart();
  const totalItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const handleOpenLogin = (e) => {
    e.preventDefault();
    setShowLogin(true);
  };

  const handleCloseLogin = () => setShowLogin(false);

  return (
    <>
      <Navbar
        expand="lg"
        variant="dark"
        className="custom-navbar sticky-top title-font"
      >
        <Container fluid>
          <Link to="/">
            <img
              src="/logo.png"
              alt="logo desktop"
              className="d-none d-lg-block"
              style={{ width: "10em", cursor: "pointer" }}
            />
            <img
              src="/S.svg"
              alt="logo mobile"
              className="d-block d-lg-none"
              style={{ width: "3.5em", cursor: "pointer" }}
            />
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 d-flex flex-row flex-wrap justify-content-center justify-content-lg-between align-items-center text-center my-3 my-lg-0">
              <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-lg-4 w-100 w-lg-auto mx-auto">
                <div className="col-6 col-lg-auto py-2 py-lg-0">
                  <NavDropdown
                    title="SHOP"
                    id="shop-nav-dropdown"
                    className="custom-dropdown d-inline-block"
                  >
                    <NavDropdown.Item as={Link} to="/#shop/macbook">
                      MacBook
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/#shop/windows">
                      Notebook Windows
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/#shop/pcdesktop">
                      PC Desktop
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/#shop/monitor">
                      Monitor
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/#shop/accessori">
                      Accessori
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/#shop/tutti">
                      Tutti i prodotti
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>

                <div className="col-6 col-lg-auto py-2 py-lg-0">
                  <Nav.Link
                    as={Link}
                    to="/configuratore"
                    className="text-white"
                  >
                    PC Builder
                  </Nav.Link>
                </div>

                <div className="col-6 col-lg-auto py-2 py-lg-0">
                  <Nav.Link as={Link} to="/comparatore" className="text-white">
                    Comparatore
                  </Nav.Link>
                </div>

                <div className="col-6 col-lg-auto py-2 py-lg-0">
                  <Nav.Link
                    href="#accedi"
                    className="text-white"
                    onClick={handleOpenLogin}
                  >
                    Accedi
                  </Nav.Link>
                </div>
              </div>

              <div className="col-12 col-lg-auto py-2 py-lg-0 d-block d-lg-none">
                <Nav.Link
                  as={Link}
                  to="/cart"
                  className="text-white fs-4 p-0 position-relative d-inline-block"
                >
                  <BsCart />
                  {totalItemsCount > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {totalItemsCount}
                    </Badge>
                  )}
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>

          <div className="col-12 col-lg-auto py-2 py-lg-0 d-none d-lg-block">
            <Nav.Link
              as={Link}
              to="/cart"
              className="text-white fs-4 p-0 position-relative d-inline-block"
            >
              <BsCart />
              {totalItemsCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "0.6rem" }}
                >
                  {totalItemsCount}
                </Badge>
              )}
            </Nav.Link>
          </div>
        </Container>
      </Navbar>

      <Login show={showLogin} handleClose={handleCloseLogin} />
    </>
  );
}

export default Navbarc;
