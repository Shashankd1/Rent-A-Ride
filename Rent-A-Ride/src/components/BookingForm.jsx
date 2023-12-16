
import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
//import { rentCar } from "../services/UserService";
import { fetchUserByEmail, rentCar } from "../services/UserService";
import { NavigationBar } from "./NavigationBar";

const BookingForm = ({ onBook }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [carType, setCarType] = useState("");
    const[email,setEmail] = useState("");
    const [formData,setFormData]=useState({
    pickupDate:"",
    returnDate:"",
    email:"",
    carType:""
    });

    const openModalDialog = () => {
      setShowDialog(true);
  }
  const closeModalDialog = () => {
      setShowDialog(false);
  }

    const handleChange=(e)=>{
      setFormData({pickupDate,returnDate,email,carType});
   };

    const handleBook = async(e) => {
      try {
        console.log(formData);
        const result=await rentCar(formData,email);
        closeModalDialog();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    
    return (
      <>

      <NavigationBar/>
      <Container>
        <Form className="bg-secondary text-light p-4">
          <h2 className="mb-4"> Booking Form </h2>{" "}
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="pickupDate">
                <Form.Label> Pickup Date </Form.Label>{" "}
                <Form.Control
                  type="date"
                  value={pickupDate}
                  onChange={(e)=>setPickupDate(e.target.value)}
                  onClick={handleChange}
                />{" "}
              </Form.Group>{" "}
            </Col>{" "}
            <Col>
              <Form.Group controlId="returnDate">
                <Form.Label> Return Date </Form.Label>{" "}
                <Form.Control
                  type="date"
                  value={returnDate}
                  onChange={(e)=>setReturnDate(e.target.value)}
                  onClick={handleChange}
                />{" "}
              </Form.Group>{" "}
            </Col>{" "}
            <Col>
            <Form.Group controlId="email">
                <Form.Label> Email ID </Form.Label>{" "}
                <Form.Control
                  type="text"
                  onChange={(e)=>setEmail(e.target.value)}
                  onKeyUp={handleChange}
                />{" "}
              </Form.Group>{" "}
            </Col>{" "}
          </Row>
          <Form.Group controlId="carType" className="mb-3">
            <Form.Label> Car Type </Form.Label>{" "}
            <Form.Control
              as="select"
              value={carType}
              onChange={(e)=>setCarType(e.target.value)}
              onClick={handleChange}
            >
              <option value="Toyota Camry"> Toyota Camry </option>{" "}
              <option value="Swift"> Swift </option>{" "}
              <option value="Bolero"> Bolero </option>{" "}
              <option value="Hyundai Creta"> Hyundai Creta </option>{" "}
              <option value="Tata Nexon"> Tata Nexon </option>{" "}
              <option value="Mahindra Scorpio"> Mahindra Scorpio </option>{" "}
            </Form.Control>{" "}
          </Form.Group>
          <Button variant="success" onClick={openModalDialog}>
            Book Now{" "}
          </Button>{" "}
        </Form>
        <Modal show={showDialog} onHide={closeModalDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Confirm your booking for renting {carType} for email {email} from {pickupDate} to {returnDate}?</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => {
              handleBook();
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
};

export default BookingForm;