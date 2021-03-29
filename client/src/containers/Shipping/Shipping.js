import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';

// Boostrap & Styling:
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const ShippingScreen = props => {
    const [formState, setFormState] = useState({
        address: props.shippingAddress.address || '',
        city: props.shippingAddress.city || '',
        country: props.shippingAddress.country || '',
        postalCode: props.shippingAddress.postalCode || ''
    });

    useEffect(() => {
        if (!props.purchaseMode) {
            props.history.push('/');
        }
    }, [])

    const updateState = e => {
        e.preventDefault();
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const send = e => {
        e.preventDefault();
        props.saveShippingAddress(formState, props.history);
    }

    return (
        <Container className="position">
            <CheckoutSteps step1={true}/>
            <br />
            <Form onSubmit={(e) => send(e)}>
                <h1 className="step">Shipping</h1>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            onChange={(e) => updateState(e)}
                            value={formState.address}
                            name="address"
                            type="text" 
                            placeholder="Enter Address" />
                        <Form.Text>* Required Field</Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            onChange={(e) => updateState(e)}
                            value={formState.city}
                            name="city"
                            type="text" 
                            placeholder="Enter City" />
                        <Form.Text>* Required Field</Form.Text>
                    </Form.Group>                
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            onChange={(e) => updateState(e)}
                            value={formState.country}
                            name="country"
                            type="text" 
                            placeholder="Enter Country" />
                        <Form.Text>* Required Field</Form.Text>
                    </Form.Group>                
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            onChange={(e) => updateState(e)}
                            value={formState.postalCode}
                            name="postalCode"
                            type="text" 
                            placeholder="Postal Code" />
                    </Form.Group>                
                </Col>
            </Row>
            <Button 
                variant="dark" 
                type="submit"
                disabled={formState.address && formState.city && formState.country ? false : true }>
                Next
            </Button>
            </Form>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        shippingAddress: state.order.shippingAddress,
        purchaseMode: state.purchaseMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveShippingAddress: (data, history) => dispatch(action.shippingOrder(data, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingScreen);