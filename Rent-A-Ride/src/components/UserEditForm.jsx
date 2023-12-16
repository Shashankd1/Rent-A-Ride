import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserByEmail, updateUser } from "../services/UserService";
import { NavigationBar } from "./NavigationBar";

export function UserEditForm() {
    const params=useParams();
    const [formData,setFormData]=useState({fname: "",
    lname: "",
    email: "",
    password: "",
    mobno: "",
    driverLicense: "",
    address: "",
    carno: ""});
    const [isSubmitted,setIsSubmitted]=useState(false);

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
           const result=await updateUser(formData,params.email);
           console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const populateUserState=async()=>{
        try {
            const result=await fetchUserByEmail(params.email);
            setFormData(result.user);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        populateUserState();
    },[]);

    return (
        <>
        <NavigationBar/>
        <Container>
            <Header text="Update user here"></Header>
            {formData?<Form onSubmit={handleSubmit}>
            <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={isSubmitted?formData.roll:null} placeholder="Enter First Name" name="fname" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last name" name="lname" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter Email" name="email" onKeyUp={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" value={isSubmitted?formData.roll:null} placeholder="Enter Password" name="password" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" value={isSubmitted?formData.roll:null} placeholder="Enter Mobile No." name="mobno" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col lg={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Driver License No.</Form.Label>
                            <Form.Control type="text" placeholder="Enter Driver License No." name="driverLicense" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Full Address" name="address" onKeyUp={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3}>
                        <Button variant="primary" type="submit">Update</Button>
                    </Col>
                    
                </Row>
            </Form>:<p>No data found for given roll no.</p>}
            
            <Row className="mt-3">
                <Col lg={4}>
                    {isSubmitted?<Alert variant="success">User Registered</Alert>:null}
                </Col>
            </Row>
        </Container>
        </>
    );
}