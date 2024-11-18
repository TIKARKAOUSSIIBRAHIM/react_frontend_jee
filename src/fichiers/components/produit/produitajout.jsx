import axios_client from "../../config/host-app";
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


function InsertProduit({ addProduitToList }) {
    const [nom, setNom] = useState('');
    const [prix, setPrix] = useState('');
    const [quantité, setQuantité] = useState('');

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newProduit = { nom, prix, quantité };

        try {
            // Post the new product data to the backend
            const response =  await axios_client.post('/produit/produit/add', newProduit);

            // Reset form fields
            setNom('');
            setPrix('');
            setQuantité('');
            addProduitToList(response.data); 
        } catch (error) {
            console.error("Error adding produit:", error);
        }
    };

    return (
        <div>
            <h3>Ajouter un Produit</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Entrer le nom du produit" 
                        value={nom} 
                        onChange={(e) => setNom(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formPrix">
                    <Form.Label>Prix</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Entrer le prix du produit" 
                        value={prix} 
                        onChange={(e) => setPrix(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formQuantité">
                    <Form.Label>Quantité</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Entrer la quantité du produit" 
                        value={quantité} 
                        onChange={(e) => setQuantité(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Ajouter
                </Button>
            </Form>
        </div>
    );
}

export default InsertProduit;