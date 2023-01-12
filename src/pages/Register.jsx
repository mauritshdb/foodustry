import React from "react";
import '../css/Register.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import register from "../api_folder/ApiRegister";

function Register() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById('floatingName').value;
        const email = document.getElementById('floatingEmail').value;
        const password = document.getElementById('floatingPassword').value;
        const passwordRepeat = document.getElementById('floatingRePassword').value;
        const role = document.getElementById('floatingSelect').value;
        const proflePictureUrl = document.getElementById('formImg').value;
        const phoneNumber = document.getElementById('floatingNumber').value;
        register(username, email, password, passwordRepeat, role, proflePictureUrl, phoneNumber).then(() => {
            alert('Registered!')
            document.getElementById('floatingName').value = "";
            document.getElementById('floatingEmail').value = "";
            document.getElementById('floatingPassword').value = "";
            document.getElementById('floatingRePassword').value = "";
            document.getElementById('floatingSelect').value = "Open this select menu";
            document.getElementById('formImg').value = "";
            document.getElementById('floatingNumber').value = "";
        })


    }

    return (
        <>
            <div className="zxc">
                <div className="c1">
                    <h1 style={{ color: 'white' }}>Register</h1>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingName"
                            label="Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Enter name" />
                        </FloatingLabel>
                        <Row>
                            <Col md>
                                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                                    <Form.Control type="password" placeholder="Password" />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingRePassword" label="Repeat Password" className="mb-3">
                                    <Form.Control type="password" placeholder="Password" />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <FloatingLabel
                            controlId="floatingEmail"
                            label="Email Address"
                            className="mb-3"
                        >
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingNumber"
                            label="Phone Number"
                            className="mb-3"
                        >
                            <Form.Control type="number" placeholder="Enter phone number" />
                        </FloatingLabel>

                        <Row>
                            <Col md>
                                <FloatingLabel controlId="floatingSelect" label="Choose a role" className="mb-3">
                                    <Form.Select aria-label="Floating label select example">
                                        <option>Open this select menu</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <Form.Group controlId="formImg" className="mb-3">
                                    <Form.Control type="text" size="lg" placeholder="Image URL" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="secondary" type="submit">
                            Sign up
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default Register;