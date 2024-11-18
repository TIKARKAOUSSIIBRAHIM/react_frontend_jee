import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios_client from "../../config/host-app";
import InsertAchat from './achatajout'; // Assuming the path is correct

function Achats() {
    const [listAchat, setListAchat] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedAchat, setSelectedAchat] = useState({});

    // Fetch all achats
    const getAllAchats = async () => {
        try {
            const response = await axios_client.get('/achat/achat/all');
            setListAchat(response.data);
        } catch (err) {
            console.error("Error fetching achats:", err);
        }
    };

    // Callback function to handle new achat
    const handleNewAchat = (newAchat) => {
        setListAchat((prevList) => [...prevList, newAchat]);
    };

    // Delete achat
    const deleteAchat = async (id) => {
        try {
            await axios_client.delete(`/achat/achat/${id}`);
            setListAchat(listAchat.filter((achat) => achat.id !== id));
        } catch (error) {
            console.error("Error deleting achat:", error);
        }
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAchat({}); // Reset to an empty object when closing the modal
    };

        // Function to handle opening the modal with details
        const handleShowDetails = async (id) => {
            try {
                const response = await axios_client.get(`/achat/achat/withall/${id}`);
                setSelectedAchat(response.data); // Store detailed achat data
                setShowModal(true); // Show the modal
            } catch (error) {
                console.error("Error fetching achat details:", error);
            }
        };

// Update achat function
const updateAchat = async () => {
    try {
        // Send the updated achat to the backend
        const response = await axios_client.put(`/achat/achat/update/${selectedAchat.id}`, selectedAchat);

        // Update the local state with the new achat details
        const updatedAchat = response.data;
       

        // Close the update modal
        setShowUpdateModal(false); 
        setListAchat((prevList) =>
            prevList.map((achat) => 
                achat.id === updatedAchat.id ? updatedAchat : achat
            )
        );
    } catch (error) {
        console.error("Error updating achat:", error);
    }
};


    // Handle input changes for update
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedAchat(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Open the update modal with the selected achat's data
    const openUpdateModal = (achat) => {
        setSelectedAchat(achat);
        setShowUpdateModal(true);
    };

    useEffect(() => {
        getAllAchats();
    }, []);

    return (
        <>
            <InsertAchat onAchatAdded={getAllAchats} />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Produit ID</th>
                        <th>Fournisseur ID</th>
                        <th>Quantité</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listAchat.map((achat, index) => (
                        <tr key={index}>
                            <td>{achat.produitId}</td>
                            <td>{achat.fournisseurId}</td>
                            <td>{achat.quantite}</td>
                            <td>{achat.date}</td>
                            <td>
                            <Button 
                                        variant="info" 
                                        onClick={() => handleShowDetails(achat.id)}
                                    >
                                        Détails
                                    </Button>{' '}
                                <Button 
                                    variant="warning" 
                                    onClick={() => openUpdateModal(achat)}
                                >
                                    Modifier
                                </Button>
                                <Button 
                                    variant="danger" 
                                    onClick={() => deleteAchat(achat.id)}
                                >
                                    Supprimer
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Modal for Achat Details */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Détails de l'Achat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAchat && (
                        <div>
                            <h5>ID: {selectedAchat.id}</h5>
                            <h6>Produit:</h6>
                            <p>Nom: {selectedAchat.produitDTO?.nom || 'N/A'}</p>
                            <p>Prix: {selectedAchat.produitDTO?.prix || 'N/A'}</p>
                            <p>Quantité: {selectedAchat.produitDTO?.quantité || 'N/A'}</p>
                            <h6>Fournisseur:</h6>
                            <p>Nom: {selectedAchat.fournisseurDTO?.nom || 'N/A'}</p>
                            <p>Contact: {selectedAchat.fournisseurDTO?.contact || 'N/A'}</p>
                            <h6>Autres détails:</h6>
                            <p>Quantité: {selectedAchat.quantite}</p>
                            <p>Date: {selectedAchat.date}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>


           

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier Achat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formProduitId">
                            <Form.Label>Produit ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="produitId"
                                value={selectedAchat.produitId || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formFournisseurId">
                            <Form.Label>Fournisseur ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="fournisseurId"
                                value={selectedAchat.fournisseurId || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formQuantite">
                            <Form.Label>Quantité</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantite"
                                value={selectedAchat.quantite || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={selectedAchat.date || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={updateAchat}>
                        Sauvegarder
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Achats;
