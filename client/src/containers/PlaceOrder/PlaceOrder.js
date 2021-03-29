import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import { Redirect } from 'react-router-dom';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';

// Boostrap & Styling:
import { Button, Row, Col, ListGroup, Card, ListGroupItem, Container, Modal } from 'react-bootstrap';
import { Fragment } from 'react';

const PlaceOrderScreen = props => {
    const [show, setShow] = useState(false);
    
    const send = e => {
        e.preventDefault();
        setShow(true);
    }

    useEffect(() => {
        if (!props.purchaseMode) {
            props.history.push('/');
        }
    }, [])

    const modal =  <Modal
                        show={show}
                        onHide={() => setShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                        >
                        <Modal.Header>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Great Choice!
                        </Modal.Title>
                        <Button onClick={() => props.history.push('/')}>Close</Button>
                        </Modal.Header>
                        <Modal.Body>
                        <p>
                            Thank you for purchasing our product. Your support and trust in us are
                            much appreciated. Yasmin Versano
                        </p>
                        </Modal.Body>
                    </Modal>

    return (
        <Container className="position">
            {modal}
            {props.purchaseMode ? (
                <Fragment>
                    <CheckoutSteps step1={true} step2={true} step3={true}/>
                    <br />
                    <h1>Your Order</h1>
                    <hr />
                    <Row>
                        <Col md={8} sm={12}>                 
                            <h3>Shipping To:</h3>
                            <p>
                                {props.shipping.address + ', ' + 
                                props.shipping.city + ', ' + 
                                props.shipping.country + ', ' + 
                                props.shipping.postalCode}
                            </p>
                            <hr />
                            <h3>Payment Method:</h3>
                            <strong>{props.payment}</strong>
                            <hr />
                            <h3>Dress:</h3>
                            <p>Type: {props.dress.type}</p>
                        </Col>
                        <Col md={4} sm={12}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroupItem>
                                        <h3>Order Summary</h3>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Shipping Tax: {props.dress.price.toFixed(2) / 10} $ (10%)
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Order Price: {props.dress.price.toFixed(2)} $
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Sum: {Number(props.dress.price.toFixed(2)) + Number((props.dress.price.toFixed(2)) / Number(10))} $
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Button
                                        onClick={(e) => send(e)}
                                        variant="success"        
                                        >Order Now!</Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </Fragment>
            ) : (<Redirect path={'/'}/>)}
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        purchaseMode: state.purchaseMode,
        shipping: state.order.shippingAddress,
        payment: state.order.paymentMethod,
        dress: state.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        create: (data, history) => dispatch(action.createOrder(data, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderScreen);