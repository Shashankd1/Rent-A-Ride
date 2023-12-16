import { Button, Container, Modal, Table } from "react-bootstrap";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { deleteCar, fetchCars } from "../services/CarService";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";

export function CarsDisplay() {

    const [cars, setCars] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedCarno,setSelectedCarno] = useState("");
    const navigate = useNavigate();

    const openModalDialog = () => {
        setShowDialog(true);
    }
    const closeModalDialog = () => {
        setShowDialog(false);
    }

    async function populateCarState() {
        try {
            const data = await fetchCars();
            setCars(data.cars);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        populateCarState();
    }, []);

    const handleCarDelete = async () => {
        try {
            await deleteCar(selectedCarno);
            populateCarState();
            closeModalDialog();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <NavigationBar/>
        <Container>
            
            <Header text="List of all the cars"></Header>
            {cars.length !== 0 ? <Table className="mt-4">
                <thead>
                    <tr>
                    <th>Car Number</th>
                    <th>Car Name</th>
                    <th>Owner Name</th>
                    <th>Model Number</th>
                    <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cars.map((s) => {
                            return (
                                <tr>
                                    <td>{s.carno}</td>
                                    <td>{s.carname}</td>
                                    <td>{s.ownername}</td>
                                    <td>{s.modelnumber}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => {
                                            openModalDialog();
                                            setSelectedCarno(s.carno);
                                        }}>Delete</Button> &nbsp;&nbsp;&nbsp;
                                        <Button variant="primary" onClick={()=>{
                                            navigate(`/edit/${s.carno}`)
                                        }}>Edit</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> : <p>No Cars found...!</p>}

            <Modal show={showDialog} onHide={closeModalDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete the car with carno {selectedCarno}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={()=>{
                        handleCarDelete();
                    }}>
                        Yes
                    </Button>
                    <Button variant="danger" onClick={closeModalDialog}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </>
    );
}