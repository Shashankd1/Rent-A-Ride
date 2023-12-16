import { Button, Container, Modal, Table } from "react-bootstrap";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { deleteUser, fetchUsers } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";

export function UsersList() {

    const [users, setUsers] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedEmail,setSelectedEmail] = useState("");
    const navigate = useNavigate();

    const openModalDialog = () => {
        setShowDialog(true);
    }
    const closeModalDialog = () => {
        setShowDialog(false);
    }

    async function populateUserState() {
        try {
            const data = await fetchUsers();
            setUsers(data.users);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        populateUserState();
    }, []);

    const handleUserDelete = async () => {
        try {
            await deleteUser(selectedEmail);
            populateUserState();
            closeModalDialog();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <NavigationBar/>
        <Container>
            
            <Header text="List of all the users"></Header>
            {users.length !== 0 ? <Table className="mt-4">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile No.</th>
                        <th>Driver License No.</th>
                        <th>Address</th>
                        <th>Car type</th>
                        <th>Pickup date</th>
                        <th>Return date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((s) => {
                            return (
                                <tr>
                                    <td>{s.fname}</td>
                                    <td>{s.lname}</td>
                                    <td>{s.email}</td>
                                    <td>{s.mobno}</td>
                                    <td>{s.driverLicense}</td>
                                    <td>{s.address}</td>
                                    <td>{s.carType}</td>
                                    <td>{s.pickupDate}</td>
                                    <td>{s.returnDate}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => {
                                            openModalDialog();
                                            setSelectedEmail(s.email);
                                        }}>Delete</Button> &nbsp;&nbsp;&nbsp;
                                        <Button variant="primary" onClick={()=>{
                                            navigate(`/edit/${s.email}`)
                                        }}>Edit</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> : <p>No users found...!</p>}

            <Modal show={showDialog} onHide={closeModalDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete user with email {selectedEmail}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={()=>{
                        handleUserDelete();
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