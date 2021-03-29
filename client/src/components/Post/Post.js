import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';

import { Card } from 'react-bootstrap';

const Post = props => {
    const remove = e => {
        e.preventDefault();
        props.delete(props.id);
    }

    return (
        <Card className="post">
            <Card.Header>
                <i className="fas fa-comments fa-lg">{' ' + props.about}</i>
                {props.isAdmin ? (
                    <button onClick={(e) => remove(e)}>
                        <i className="fas fa-calendar-times fa-lg"></i>
                    </button>
                ) : (null)}
            </Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>{props.comment}</p>
                    <footer className="blockquote-footer">Written By - <cite title="Source Title">{props.name}</cite></footer>
                </blockquote>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = state => {
    return {
        isAdmin: state.isAdmin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        delete: (id) => dispatch(action.deletePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);