import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import Post from '../../components/Post/Post';

import { Form, Row, Col, Container, Button } from 'react-bootstrap';

const Contact = props => {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        for: '',
        text: ''
    })

    useEffect(() => {
        props.fetch();
    }, [])

    const updateState = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const sendPost = e => {
        e.preventDefault();
        props.send(formState);
        setFormState({
            firstName: '',
            lastName: '',
            email: '',
            for: '',
            text: ''
        })
    }

    return (
        <Container>
            <div className="position">
                <Form onSubmit={(e) => sendPost(e)}>
                    <div className="contact_main">
                        <h1><i className="fas fa-envelope"></i> Did you see something you liked?</h1>
                        <p>please share your thoughts and suggestions</p>
                        <h3>Yasminversano@Gmail.com</h3>
                        <small>Don't Hesitate To Make Any Contact With Me</small>
                    </div>
                    <Row>
                        <Col md={6} sm={12}>
                        <Form.Control
                            onChange={(e) => updateState(e)}
                            value={formState.firstName}
                            className="y-margin" 
                            placeholder="First name" 
                            name="firstName"/>
                        </Col>
                        <Col md={6} sm={12}>
                            <Form.Control 
                                onChange={(e) => updateState(e)}
                                value={formState.lastName}
                                className="y-margin" 
                                placeholder="Last name" 
                                name="lastName"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={12}>
                            <Form.Control 
                                onChange={(e) => updateState(e)}
                                value={formState.email}
                                className="y-margin" 
                                placeholder="Email Address" 
                                name="email"/>
                        </Col>
                        <Col md={6} sm={12}>
                            <Form.Control 
                                as="select" 
                                custom 
                                onChange={(e) => updateState(e)}
                                value={formState.for}
                                className="y-margin" 
                                name="for">
                                {props.dresses.map(dress => {
                                    return (
                                        <option key={dress._id}>{dress.type}</option>
                                    )
                                })}
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Free Note:</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    onChange={(e) => updateState(e)}
                                    value={formState.text}
                                    rows={3} 
                                    name="text"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button 
                                type="submit" 
                                className="button"
                                disabled={formState.firstName === '' ||
                                formState.lastName === '' ||
                                formState.email === '' ||
                                formState.for === '' ||
                                formState.text === ''}>Mail Me!</Button>   
                        </Col>
                    </Row>
                </Form>
                {props.posts.map(post => {
                    return (
                        <Row as="div" key={post._id}>
                            <Col lg={12}>
                                <Post
                                    name={post.name}
                                    comment={post.note}
                                    about={post.for}
                                    id={post._id}/>
                            </Col>
                        </Row>
                    )
                })}               
            </div>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        dresses: state.products,
        posts: state.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        send: (data) => dispatch(action.postPost(data)),
        fetch: () => dispatch(action.getPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);