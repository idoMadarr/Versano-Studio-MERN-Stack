import React from 'react';
import { Link } from 'react-router-dom';

import { Card, ListGroupItem, ListGroup, Button } from 'react-bootstrap';

const DressCard = props => {
    return (
        <Card className="main-card">
            <Card.Img variant="top" src={`http://localhost:5000/${props.image}`} className="card-img"/>
            <Card.Body>
                <Card.Title>{props.type}</Card.Title>
                <Card.Text>
                    <Link to={`/${props.id}`}>{props.desc}</Link>
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem style={{ display: 'flex', justifyContent: 'space-between' }}>In Stock: {props.stock ? (
                    <i className="far fa-check-circle fa-2x in"></i>
                    ) :
                    <i className="far fa-times-circle fa-2x out"></i>}
                </ListGroupItem>
                <ListGroupItem>Price: {props.price} $</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Link className="link-btn" to={`/${props.id}`}>
                    <Button>View</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default DressCard;