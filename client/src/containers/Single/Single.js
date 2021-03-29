import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import { Link } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

import { Container, Row, Col, Image, ListGroupItem, ListGroup, Button } from 'react-bootstrap';

const Single = props => {
    useEffect(() => {
        props.fetchOne(props.match.params.dressId);
    }, [])

    return (
        <div className="position">
            <Container>
                <Button variant="dark">
                    <Link className="link-btn" to={"/"}>Back</Link>
                </Button>
                {props.product ? (     
                    <Row>
                        <Col lg={7} md={7} sm={12}>
                            <Image src={props.product.image} fluid/>
                        </Col>
                        <Col lg={5} md={5} sm={12}>
                            <ListGroup>
                                <ListGroupItem>
                                    <h2>{props.product.type}</h2>
                                </ListGroupItem>
                                <ListGroupItem>
                                <p>{props.product.description}</p>
                                </ListGroupItem>
                                <ListGroupItem>
                                <p>Price: {props.product.price} $</p>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Link className="link-btn" to="/shipping">
                                        <Button disabled={props.product.inStock ? false : true} className="button">ORDER NOW!</Button>
                                    </Link>
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                    ) : (<Spinner />)}
            </Container>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        product: state.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOne: (id) => dispatch(action.getSingle(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Single);