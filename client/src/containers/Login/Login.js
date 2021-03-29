import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import Spinner from '../../components/UI/Spinner/Spinner';

import { Row, Col, Container, Form, Button, Alert } from 'react-bootstrap';

const Login = props => {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (props.isAdmin) props.history.push('/admin');
    }, []);

    const updateState = e => {
        setFormState(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const send = e => {
        e.preventDefault();
        props.login(formState, props.history);
    }

    return (
        <Container className="position">
            {props.errors.length > 0 ? (
                <Alert variant="primary">
                    <h3><i className="fas fa-exclamation-triangle fa-2x"></i>Ops!</h3>
                    {props.errors.map((err, index) => {
                        return (
                            <p key={index}>{err.msg}</p>
                        )
                    })}
                </Alert>
            ) : (null)}           
            <h3><i className="fas fa-unlock fa-2x"></i> Admin Login</h3>
            <p>Create and manage your products</p>
            <small>Admin: yasminversano@gmail.com</small>
            <br />
            <small>Password: 123456</small>
            <Form onSubmit={(e) => send(e)} className="input-space">
                <Row>
                    <Col md={6}>
                        <Form.Control type="email" 
                            onChange={(e) => updateState(e)} 
                            name="email"
                            placeholder="Admin Email" 
                            id="email" />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Control type="text" 
                            onChange={(e) => updateState(e)} 
                            name="password" 
                            placeholder="Password"
                            id="password" />
                    </Col>    
                </Row>
                <Row>
                    <Col md={6} className="spinner-container">
                        <Button type="submit" style={{ height: '2rem' }}>Login</Button>
                        {props.isLoading ? (<Spinner />) : (null)}
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        isAdmin: state.isAdmin,
        isLoading: state.isLoading,
        errors: state.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (data, history) => dispatch(action.adminLogin(data, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);