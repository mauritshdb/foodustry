import React from "react";
import '../css/Login.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import login from '../api_folder/ApiLogin';

function Login() {

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById('floatingInput').value;
        const password = document.getElementById('floatingPassword').value;
        login(username, password)
            .then(function (response) {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("role", response.data.user.role);
                window.location.assign('/');
            });
    }

    return (
        <>
            <div className="zxc">
                <div className="c1">
                    <h1 style={{ color: 'white' }}>Login</h1>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>

                        <Button variant="secondary" type="submit" className="mt-3">
                            Sign in
                        </Button>
                    </Form>
                    <h4 className="mt-3" style={{ color: 'grey', textAlign: 'center' }}>Don't have an account? <a href="/register" style={{ color: 'white' }}>Sign up</a></h4>
                </div>
            </div>

        </>
    );
}

export default Login;