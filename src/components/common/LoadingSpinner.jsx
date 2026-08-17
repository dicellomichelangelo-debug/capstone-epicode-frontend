import { Spinner, Container } from "react-bootstrap";

function LoadingSpinner() {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <Spinner
        animation="border"
        role="status"
        variant="light"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Caricamento in corso...</span>
      </Spinner>
      <p className="mt-3 text-white-50 fw-semibold">Caricamento in corso...</p>
    </Container>
  );
}

export default LoadingSpinner;
