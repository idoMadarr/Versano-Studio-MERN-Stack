import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';

import { Row, Col, Container, Form, Button, Card } from 'react-bootstrap';

const Admin = props => {
    const [formState, setFormState] = useState({
        type: '',
        description: '',
        inStock: false,
        price: '',
        image: ''
    });

    const updateState = e => {
        setFormState((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const fileHandler = e => {
        setFormState(() => {
            return {
                ...formState,
                image: e.target.files[0]
            }
        })
    }

    const send = (e) => {
        e.preventDefault();
        if (formState.type !== '' &&
        formState.description !== '' &&
        formState.price !== '' &&
        formState.image !== '') {
            props.add(formState);
            setFormState({
                type: '',
                description: '',
                inStock: false,
                price: '',
                image: ''
            })
        }
        return;
    }
    return (
        <Container>
            <div style={{margin: "10rem 0"}}>
                <h1>Admin Controller</h1>
                <small>Add, Remove and Edit your products:</small>
                <Form onSubmit={(e) => send(e)} className="input-space">
                    <Row>
                        <Col md={6} sm={12}>
                            <Form.Control type="text" 
                            onChange={(e) => updateState(e)} 
                            value={formState.type}
                            placeholder="Type"
                            maxLength={20}
                            name="type"
                            id="type"/>    
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={12}>
                            <Form.Control type="text" 
                            onChange={(e) => updateState(e)} 
                            value={formState.description}
                            placeholder="Description" 
                            maxLength={40}
                            name="description" 
                            id="description"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={12}>
                            <Form.Control type="text" 
                            onChange={(e) => updateState(e)} 
                            value={formState.price} 
                            placeholder="Price"
                            name="price" 
                            id="price"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={12} style={{paddingLeft: '1.5rem'}}>
                            <Form.Check type="checkbox"
                            label="In Stock" 
                            onChange={(e) => setFormState({ ...formState, inStock: e.target.checked })} 
                            value={formState.inStock} 
                            name="inStock" 
                            id="inStock"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={12}>
                            <Form.Control type="file" 
                            onChange={(e) => fileHandler(e)} 
                            accept=".png,.jpg,.jpeg" 
                            name="image" 
                            id="image"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Button type="submit"
                            disabled={formState.type === '' ||
                            formState.description === '' ||
                            formState.price === '' ||
                            formState.image === ''}
                            >Create</Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    {props.dresses.map(dress => {
                        return (
                            <Col as="div" lg={3} md={4} sm={12} key={dress._id}>
                                <Card className="admin-card">
                                    <Card.Text><strong>{dress.type}</strong></Card.Text>
                                    <Card.Img variant="top" src={dress.image}/>
                                    <Card.Body>
                                    <Card.Text>{dress.description}</Card.Text>
                                    <Button onClick={() => props.remove(dress._id)}>Remove</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        dresses: state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (data) => dispatch(action.newProduct(data)),
        remove: (id) => dispatch(action.deleteProduct(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);