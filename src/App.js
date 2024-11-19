import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Fragment } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import Produits from './fichiers/components/produit/produit';
import InsertProduit from './fichiers/components/produit/produitajout';
import Fournisseurs from './fichiers/components/fournisseur/fournisseur';
import InsertFournisseur from './fichiers/components/fournisseur/fournisseurajout';
import Achats from './fichiers/components/achat/achat';
import InsertAchat from './fichiers/components/achat/achatajout';
import RegisterPage from './fichiers/components/connect/RegisterPage';
function App() {
  return (
    <Router>
    
      <Nav className="justify-content-center"  variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/produits">Produit</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/fournisseurs">Fournisseur</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/achats" >
            Achat
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Container>
        <Routes>
  
          <Route path="/produits" element={<Fragment><Produits /></Fragment>}  />
          <Route path="/fournisseurs" element={<Fragment><Fournisseurs /></Fragment>} />
          <Route path="/achats" element={<Fragment><Achats /></Fragment>}  />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
