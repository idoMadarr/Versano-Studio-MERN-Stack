import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';

import { Row, Col, Carousel, Container } from 'react-bootstrap';

const Collection_2020 = props => {
    useEffect(() => {
        props.fetch();
    }, [])

    return (
        <Fragment>
            <Container>
                <div className="position">
                    <h1>Collection 2020</h1>
                    <Row>
                        <Col md={12}>
                            <Carousel fade>
                                {props.dresses.map(dress => {
                                    return (
                                        <Carousel.Item key={dress._id}>
                                            <img src={`http://localhost:5000/${dress.image}`} className="carousel_imgs" alt={'img'}/>
                                            <Carousel.Caption>
                                                <h3>{dress.type}</h3>
                                                <p>{dress.description}</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <div className="y-margin">
                                <p><span>Collecion Name:</span> "Winter is Coming"</p>
                                <hr style={{width: '100%'}}/>
                                <p><span>Photography:</span> Haim Zadok</p>
                                <hr style={{width: '100%'}}/>
                                <p><span>Place:</span> Rishon Lezion, Israel</p>
                                <hr style={{width: '100%'}}/>
                                <p><span>Model:</span> Pupy Versano</p>
                                <hr style={{width: '100%'}}/>
                                <p><span>Assistant:</span> Roee Sheron</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <p>
                                There are many variations of passages of Lorem Ipsum available,
                                but the majority have suffered alteration in some form, by injected humour,
                                or randomised words which don't look even slightly believable.
                                If you are going to use a passage of Lorem Ipsum, you need to
                                be sure there isn't anything embarrassing hidden in the middle of text.
                            </p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        dresses: state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetch: () => dispatch(action.getAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection_2020);