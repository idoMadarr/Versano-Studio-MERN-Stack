import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';

// Boostrap & Styling:
import { Form, Button, Col, Container } from 'react-bootstrap';

const PaymentScreen = props => {
    const [paymentState, setPaymentState] = useState('PayPal');

    useEffect(() => {
        if (!props.purchaseMode) {
            props.history.push('/');
        }
    }, [])

    const send = e => {
        e.preventDefault();
        props.savePaymentMethod(paymentState, props.history);
    }

    return (
        <Container className="position">
            <CheckoutSteps step1={true} step2={true}/>
            <Form onSubmit={(e) => send(e)}>
                <br />
                <h1>Payment</h1>
                <Form.Group>
                    <Form.Label>Select Method</Form.Label>
                    <Col>
                        <Form.Check type="radio" 
                            onChange={(e) => setPaymentState(e.target.value)} 
                            label="PayPal"
                            id="paypal"
                            checked
                            name="method" 
                            value="PayPal">
                        </Form.Check>
                        <Form.Check type="radio" 
                            onChange={(e) => setPaymentState(e.target.value)} 
                            label="Credit Card"
                            id="credit" 
                            name="method" 
                            value="Credit Card">
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button 
                    variant="dark" 
                    type="submit">
                    Next
                </Button>
            </Form>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        purchaseMode: state.purchaseMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        savePaymentMethod: (data, history) => dispatch(action.paymentMethod(data, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);