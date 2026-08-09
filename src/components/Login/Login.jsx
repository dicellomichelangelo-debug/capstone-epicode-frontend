import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./Login.css";

const Login = ({ show, handleClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confermaPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      if (formData.password !== formData.confermaPassword) {
        alert("Le password non coincidono!");
        return;
      }
      console.log("Dati Registrazione:", {
        nome: formData.nome,
        email: formData.email,
        password: formData.password,
      });
      // Logica per inviare i dati al backend di registrazione
    } else {
      console.log("Dati Login:", {
        email: formData.email,
        password: formData.password,
      });
      // Logica per l'autenticazione
    }

    handleClose();
  };

  // Funzione per resettare i dati e cambiare modalità
  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setFormData({ nome: "", email: "", password: "", confermaPassword: "" });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="custom-login-modal"
    >
      <Modal.Body className="p-4 rounded-4 shadow-lg text-white">
        <div className="text-center mb-4">
          <h2 className="fw-bold">{isRegistering ? "Registrati" : "Accedi"}</h2>
          <p className="text-white-50">
            {isRegistering
              ? "Crea un nuovo account per iniziare"
              : "Inserisci le tue credenziali per continuare"}
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
          {isRegistering && (
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                placeholder="Mario Rossi"
                value={formData.nome}
                onChange={handleChange}
                required
                className="bg-white bg-opacity-10 text-white placeholder-white-50 border-0"
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="nome@esempio.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white bg-opacity-10 text-white placeholder-white-50 border-0"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-white bg-opacity-10 text-white placeholder-white-50 border-0"
            />
          </Form.Group>

          {isRegistering && (
            <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                name="confermaPassword"
                placeholder="••••••••"
                value={formData.confermaPassword}
                onChange={handleChange}
                required
                className="bg-white bg-opacity-10 text-white placeholder-white-50 border-0"
              />
            </Form.Group>
          )}

          <Button
            type="submit"
            className="w-100 py-2 fw-semibold text-dark border-0 btn-light rounded-3 shadow-sm mb-3"
          >
            {isRegistering ? "Crea Account" : "Entra"}
          </Button>
        </Form>

        {/* Scritta cliccabile per alternare Login e Registrazione */}
        <div className="text-center mt-3 pt-3 border-top border-white-50">
          <small className="text-white-50">
            {isRegistering
              ? "Hai già un account?"
              : "Non sei ancora registrato?"}
          </small>
          <span
            role="button"
            className="text-white fw-bold ms-2 text-decoration-underline"
            style={{ cursor: "pointer" }}
            onClick={toggleMode}
          >
            {isRegistering ? "Accedi qui" : "Registrati qui"}
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
