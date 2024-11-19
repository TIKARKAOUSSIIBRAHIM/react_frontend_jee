// src/pages/RegisterPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import axios_client from '../../config/host-app';

const RegisterPage = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      await axios_client.post('/api/auth/register', {
        nom,
        prenom,
        email,
        password,
      });
      navigate('/login');
    } catch (error) {
      setError("Échec de l'enregistrement");
      console.error('Registration error:', error);
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Body>
        <Card.Title>Enregistrement</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleRegister}>
          {/* Form fields */}
          <Form.Group controlId="nom" className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="prenom" className="mb-3">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirmez le mot de passe</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            S'enregistrer
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <a href="/login">Vous avez déjà un compte ? Connectez-vous</a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RegisterPage;
