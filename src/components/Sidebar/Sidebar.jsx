import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { BsFacebook, BsInstagram, BsSearch, BsWhatsapp } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <Container fluid className="flex-grow-1 p-0">
      <Row className="g-0 min-vh-100">
        <Col
          lg={2}
          md={3}
          xs={4}
          className="custom-sidebar p-3 d-flex flex-column justify-content-between"
        >
          <div>
            <h5
              className="fw-bold fs-6 text-uppercase mb-4 mt-3"
              style={{ color: "#0f2942", letterSpacing: "1px" }}
            >
              Filtra per:
            </h5>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Cerca..."
                aria-label="Cerca"
                style={{
                  borderRadius: "20px 0 0 20px",
                  borderRight: "none",
                  backgroundColor: "rgba(255,255,255,0.6)",
                }}
              />
              <InputGroup.Text
                style={{
                  borderRadius: "0 20px 20px 0",
                  borderLeft: "none",
                  backgroundColor: "rgba(255,255,255,0.6)",
                }}
              >
                <BsSearch />
              </InputGroup.Text>
            </InputGroup>
          </div>

          <div className="d-flex gap-3 fs-4 mt-5" style={{ color: "#0f2942" }}>
            <BsInstagram style={{ cursor: "pointer" }} />
            <BsFacebook style={{ cursor: "pointer" }} />
            <BsWhatsapp style={{ cursor: "pointer" }} />
          </div>
        </Col>

        <Col lg={10} md={9} xs={8} className="px-0">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Sidebar;
