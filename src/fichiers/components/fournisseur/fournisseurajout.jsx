import axios_client from "../../config/host-app";
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


function InsertFournisseur({ onFournisseurAdded }) {
    const [nom, setNom] = useState('');
    const [contact, setContact] = useState('');
    

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newFournisseur = { nom, contact };

        try {
            // Post the new product data to the backend
            const response = await axios_client.post('/fournisseur/fournisseur/add', newFournisseur);

            // Call the callback to inform the parent component
            onFournisseurAdded();

            // Reset form fields
            setNom('');
            setContact('');
            onFournisseurAdded(response.data);
            
        } catch (error) {
            console.error("Error adding produit:", error);
        }
    };

    return (
        <div>
            <h3>Ajouter un Fournisseur</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Entrer le nom du fournisseur" 
                        value={nom} 
                        onChange={(e) => setNom(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formContact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Entrer le contact du fournisseur" 
                        value={contact} 
                        onChange={(e) => setContact(e.target.value)} 
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

export default InsertFournisseur;