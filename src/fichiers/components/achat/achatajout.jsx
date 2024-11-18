import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios_client from "../../config/host-app";

function InsertAchat({ show, handleClose, onAchatAdded }) {
    const [listProduit, setListProduit] = useState([]);
    const [listFournisseur, setListFournisseur] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const [newAchat, setNewAchat] = useState({
        produitId: '',
        fournisseurId: '',
        quantite: '',
        date: ''
    });

    const getAllProduits = async () => {
        try {
            const rep = await axios_client.get('/produit/produit/all');
            setListProduit(rep.data);
        } catch (err) {
            console.error("Error fetching produits:", err);
        }
    };

    const getAllFournisseurs = async () => {
        try {
            const rep = await axios_client.get('/fournisseur/fournisseur/all');
            setListFournisseur(rep.data);
        } catch (err) {
            console.error("Error fetching fournisseurs:", err);
        }
    };

    const handleAddAchat = async () => {
        try {
            const response = await axios_client.post('/achat/achat/add', newAchat);
            onAchatAdded(response.data); // Notify parent about new achat
            
            setNewAchat({ produitId: '', fournisseurId: '', quantite: '', date: '' });
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.error);
            } else {
                console.error("Error adding achat:", error);
            }
        }
    };

    useEffect(() => {
        getAllProduits();
        getAllFournisseurs();
    }, []);

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Produit</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={newAchat.produitId} 
                        onChange={(e) => setNewAchat({ ...newAchat, produitId: e.target.value })}
                    >
                        <option value="">Sélectionnez un produit</option>
                        {listProduit.map((produit) => (
                            <option key={produit.id} value={produit.id}>
                                {produit.nom}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Fournisseur</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={newAchat.fournisseurId} 
                        onChange={(e) => setNewAchat({ ...newAchat, fournisseurId: e.target.value })}
                    >
                        <option value="">Sélectionnez un fournisseur</option>
                        {listFournisseur.map((fournisseur) => (
                            <option key={fournisseur.id} value={fournisseur.id}>
                                {fournisseur.nom}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Quantité</Form.Label>
                    <Form.Control 
                        type="number" 
                        value={newAchat.quantite} 
                        onChange={(e) => setNewAchat({ ...newAchat, quantite: e.target.value })}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        value={newAchat.date} 
                        onChange={(e) => setNewAchat({ ...newAchat, date: e.target.value })}
                    />
                </Form.Group>

                {errorMessage && (
                    <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
                )}
            </Form>
            <Button variant="secondary" onClick={handleClose}>
                Annuler
            </Button>
            <Button variant="primary" onClick={handleAddAchat}>
                Ajouter
            </Button>
        </>
    );
}

export default InsertAchat;
