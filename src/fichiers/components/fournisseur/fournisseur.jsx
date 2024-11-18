import axios_client from "../../config/host-app";
import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap';
import InsertFournisseur from "./fournisseurajout";

function Fournisseurs() {
    const [listFournisseur, setListFournisseur] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedFournisseur, setSelectedFournisseur] = useState({});

    const getAllFournisseur = async () => {
        try {
            const response = await axios_client.get('/fournisseur/fournisseur/all');
            setListFournisseur(response.data);
            console.log(response.data); // Log the data for debugging
        } catch (err) {
            console.error("Error fetching fournisseurs:", err);
        }
    };

    const deleteFournisseur = async (id) => {
        try {
            await axios_client.delete(`/fournisseur/fournisseur/${id}`);
            // Remove the fournisseur from the list after successful deletion
            setListFournisseur(listFournisseur.filter((fournisseur) => fournisseur.id !== id));
        } catch (error) {
            console.error("Error deleting fournisseur:", error);
        }
    };

    // Function to handle updating fournisseur
    const updateFournisseur = async () => {
        try {
            const response = await axios_client.put(`/fournisseur/fournisseur/update/${selectedFournisseur.id}`, selectedFournisseur);
            // Update the fournisseur in the list after successful update
            setListFournisseur(listFournisseur.map((fournisseur) => (fournisseur.id === response.data.id ? response.data : fournisseur)));
            setShowUpdateModal(false); // Close the modal after update
        } catch (error) {
            console.error("Error updating fournisseur:", error);
        }
    };

    // Function to handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedFournisseur(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Open the update modal with the selected fournisseur's data
    const openUpdateModal = (fournisseur) => {
        setSelectedFournisseur(fournisseur);
        setShowUpdateModal(true);
    };

    useEffect(() => {
        getAllFournisseur();
    }, []);

    return (
        <>
            <InsertFournisseur onFournisseurAdded={getAllFournisseur} />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listFournisseur.map((fournisseur, index) =>
                            <tr key={index}>
                                <td>{fournisseur.nom}</td>
                                <td>{fournisseur.contact}</td>
                                <td>
                                    <Button 
                                        variant="warning" 
                                        onClick={() => openUpdateModal(fournisseur)}
                                    >
                                        Modifier
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => deleteFournisseur(fournisseur.id)}
                                    >
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier Fournisseur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom"
                                value={selectedFournisseur.nom || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formContact">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                                type="email"
                                name="contact"
                                value={selectedFournisseur.contact || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={updateFournisseur}>
                        Sauvegarder
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Fournisseurs;
