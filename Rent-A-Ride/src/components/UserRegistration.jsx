import { Alert, Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { Header } from "./Header";
import { useState } from "react";
import { saveUser } from "../services/UserService";
import { NavigationBar } from "./NavigationBar";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Prev } from "react-bootstrap/esm/PageItem";

export function UserRegistrationForm() {
    const navigate=useNavigate();
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
           const result= await saveUser(formData);
           setFormData({fname: " ",
            lname: " ",
            email: "",
            password: "",
            mobno: "",
            driverLicense: "",
            address: "",
            carno: "",
            carType:"",
            pickupDate:"",
            returnDate:""
        });
           setIsSubmitted(true);
           navigate(Prev);
           setTimeout(()=>{
            setIsSubmitted(false);
           },1500);
           console.log(result.message);
        } catch (error) {
            console.log(error);
        }
    }

    const validationSchema = Yup.object({
        fname: Yup.string().required('First name is required'),
        lname: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/
        , 'Password must be at least 6 characters containing at least one uppercase, one lowercase, one number, one special case character').required('Password is required'),
        //confirmPassword: Yup.string()
         // .oneOf([Yup.ref('password'), null], 'Passwords must match')
          //.required('Confirm password is required'),
        mobno: Yup.string().matches(/^\d{10}$/, 'Invalid mobile number').required('Mobile number is required'),
        driverLicense: Yup.string().required('Drivers license is required'),
        address: Yup.string().required('Address is required'),
    });

    return (
        <>
        <NavigationBar/>
        <Container>
        <Card bg="danger" text="dark" border="primary" style={{marginTop : '5%'}}>
            <Card.Header as="h4" style={{textAlign:'center'}}>Register User here</Card.Header>
            <Card.Body>
            <Formik initialValues={formData} validationSchema={validationSchema}>
                <Form onSubmit={handleSubmit}>
                    <Row className="justify-content-center">
                        <Col lg={6}>
                                <Form.Group className="mb-3">
                                    <div>
                                        <label htmlFor="fname">First Name :- </label>
                                        <Field type="text" id="fname" name="fname" onKeyUp={handleChange}/>
                                        <ErrorMessage name="fname" component="div" />
                                    </div>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <div>
                                    <label htmlFor="lname">Last Name :- </label>
                                    <Field type="text" id="lname" name="lname" onKeyUp={handleChange}/>
                                    <ErrorMessage name="lname" component="div" />
                                </div>
                             </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <div>
                                    <label htmlFor="email">Email :- </label>
                                    <Field type="email" id="email" name="email" onKeyUp={handleChange}/>
                                    <ErrorMessage name="email" component="div" />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <div>
                                    <label htmlFor="password">Password :- </label>
                                    <Field type="password" id="password" name="password" onKeyUp={handleChange}/>
                                    <ErrorMessage name="password" component="div" />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <div>
                                    <label htmlFor="mobno">Mobile Number :- </label>
                                    <Field type="text" id="mobno" name="mobno" onKeyUp={handleChange} />
                                    <ErrorMessage name="mobno" component="div" />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <div>
                                    <label htmlFor="driverLicense">Driver's License :- </label>
                                    <Field type="text" id="driverLicense" name="driverLicense" onKeyUp={handleChange} />
                                    <ErrorMessage name="driverLicense" component="div" />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row >
                        <Col lg={10}>
                            <Form.Group className="mb-3">
                            <div>
                                <label htmlFor="address">Address :- </label>
                                <Field as="textarea" id="address" name="address" placeholder="Enter address" onKeyUp={handleChange} />
                                <ErrorMessage name="address" component="div" />
                            </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col lg={3}>
                            <Button variant="primary" type="submit">Register</Button>
                        </Col>
                        
                    </Row>
                </Form>
            </Formik>
            </Card.Body>
                <Row className="mt-3">
                    <Col lg={4}>
                        {isSubmitted?<Alert variant="success">User Registered</Alert>:null}
                    </Col>
                </Row>
            </Card>
        </Container>
        </>
    );
}