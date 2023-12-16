import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { login } from "../services/AdminService";
import { Navigate, useNavigate } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";
import { loginUser } from "../services/UserService";

export function Login() {
    const navigate=useNavigate();
    const [formData,setFormData]=useState({email:"",password:""});
    const [loginError,setLoginError]=useState(false);

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmitAdmin=async(e)=>{
        e.preventDefault();
        try {
          const result= await login(formData);
          localStorage.setItem("token",result.token);
          navigate("/dashboard");
        } catch (error) {
            console.log(error);
            setLoginError(true);
        }
    }

    const handleSubmitUser=async(e)=>{
        e.preventDefault();
        try {
          const result= await loginUser(formData);
          localStorage.setItem("token",result.token);
          navigate("/dashboard");
        } catch (error) {
            console.log(error);
            setLoginError(true);
        }
    }
    return (
        <>
        <NavigationBar/>
        <Container className="mt-5 ">
            
            <Row className="g-8">
                <Col lg={6}>
                    <div style={{ textAlign: 'left', padding: '5px' }}>
                        <h3>Welcome To Our Car Rental Website</h3>
                        <p>Explore the freedom of the open road with our premium car rental services.Whether you're planning a road trip, a business journey, or just need a reliable vehicle for your daily commute, we've got you covered.</p>
                        <p>Thank you for choosing us as your trusted car rental partner. Start your journey with us today!</p>
                    </div>
                </Col>
                <Col lg={5}>
                <Card bg="danger" text="light" border="primary" style={{marginTop : '5%', textAlign:'center', alignItems:'center', width:'90%'}}>
                <Card.Header as="h4" bg="dark" text="light"  style={{textAlign:'center',backgroundColor:'black'}}>Login Page</Card.Header>
                    <Form >
                        <Form.Group className="mb-3" style={{width:'90%'}}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter Email" name="email" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword" style={{width:'90%'}}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                        </Form.Group>


                        <Row >
                            <Col lg={3}>
                            <Button variant="dark" type="button" onClick={handleSubmitUser}>
                            Login
                            </Button>
                            </Col>
                        
                            <Col lg={4} style={{marginRight:'10%'}}>
                            <Button variant="dark" type="button" onClick={handleSubmitAdmin}>
                                Login as Admin
                            </Button>
                            </Col>
                        
                        </Row>
                        
                    </Form>
                </Card>
                    {loginError?<Alert variant="danger" className="mt-3">Invalid email or password</Alert>:null}
                </Col>
            </Row>
        </Container>
        </>
    );
}