import React from "react";
import '../css/Register.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Register() {
    const handleSubmit = () => {

    }

    return (
        <>
            <div className="zxc">
                <div className="c1">
                    <h1 style={{ color: 'white' }}>Register</h1>
                    <Form>
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
                            controlId="floatingInput"
                            label="Phone Number"
                            className="mb-3"
                        >
                            <Form.Control type="number" placeholder="Enter phonenumber" />
                        </FloatingLabel>

                        <Row>
                            <Col md>
                                <FloatingLabel controlId="floatingSelect" label="Choose a role" className="mb-3">
                                    <Form.Select aria-label="Floating label select example">
                                        <option>Open this select menu</option>
                                        <option value="1">User</option>
                                        <option value="2">Admin</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <Form.Group controlId="formImg" className="mb-3">
                                    <Form.Control type="text" size="lg" placeholder="Image URL"/>
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