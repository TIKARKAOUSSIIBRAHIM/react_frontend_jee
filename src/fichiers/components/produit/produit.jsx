import axios_client from "../../config/host-app";
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import InsertProduit from "./produitajout";


function Produits() {
    const [listProduit, setListProduit] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedProduit, setSelectedProduit] = useState(null);

    // Fetch all products
    const getAllProduits = async () => {
        try {
            const rep = await axios_client.get('/produit/produit/all');
            setListProduit(rep.data);
        } catch (err) {
            console.error("Error fetching produits:", err);
        }
    };
    // Function to add a new product to the list without reloading
    const addProduitToList = (produit) => {
        setListProduit((prevList) => [...prevList, produit]);
    };


    
    // Delete a product by  ID
    const deleteProduit = async (id) => {
        try {
            await axios_client.delete(`/produit/produit/${id}`);
            setListProduit(listProduit.filter((produit) => produit.id !== id));
        } catch (error) {
            console.error("Error deleting produit:", error);
        }
    };

    // Open the update modal and set the selected product
    const handleUpdateClick = (produit) => {
        setSelectedProduit(produit);
        setShowUpdateModal(true);
    };

    // Handle form input changes in the modal
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduit({ ...selectedProduit, [name]: value });
    };

    // Update the product data
    const updateProduit = async () => {
        try {
            const response = await axios_client.put(`/produit/produit/update/${selectedProduit.id}`, selectedProduit);
            // Update the product in the list after successful update
            setListProduit(listProduit.map((produit) => (produit.id === response.data.id ? response.data : produit)));
            setShowUpdateModal(false); // Close the modal after update
        } catch (error) {
            console.error("Error updating produit:", error);
        }
    };

    // Load data when the component is mounted
    useEffect(() => {
        getAllProduits();
    }, []);

    return (
        <>
            <InsertProduit  addProduitToList={getAllProduits}/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listProduit.map((produit, index) => (
                        <tr key={index}>
                            <td>{produit.nom}</td>
                            <td>{produit.prix}</td>
                            <td>{produit.quantité}</td>
                            <td>
                                <Button 
                                    variant="danger" 
                                    onClick={() => deleteProduit(produit.id)}
                                >
                                    Supprimer
                                </Button>{' '}
                                <Button 
                                    variant="warning" 
                                    onClick={() => handleUpdateClick(produit)}
                                >
                                    Modifier
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier Produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduit && (
                        <Form>
                            <Form.Group>
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nom"
                                    value={selectedProduit.nom}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Prix</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="prix"
                                    value={selectedProduit.prix}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Quantité</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="quantité"
                                    value={selectedProduit.quantité}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={updateProduit}>
                        Mettre à jour
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Produits;
