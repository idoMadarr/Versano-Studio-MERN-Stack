import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import YourDay from '../../components/YourDay/YourDay';
import Studio from '../../components/Studio/Studio';

import { Jumbotron, Button, Container, Row, Col, CardGroup } from 'react-bootstrap';

const Home = props => {
    useEffect(() => {
        props.fetch();
    }, [])

    return (
        <Fragment>
            <div className={"head-main"}>
                <Container>
                    <div className="position">
                        <Jumbotron className="transparent">
                            <h1>YASMIN VERSANO</h1>
                            <h3><i className="far fa-heart"></i> Haute Couture</h3>
                            <p>
                                Since 2006, our brand is a young brand
                                characterized by elegant, romantic, and timeless style.
                                Each and every wedding dress receives much attention and personal
                                care from the beginning until your big day.
                                In our studio, each wedding dress is sewn "Top Stitching", 
                                with an emphasis on all the ins and outs, careful handiwork, 
                                and considering the fine details of fabric embroidering.
                            </p>
                            <Link to={'/contact'}>                            
                                <Button variant="primary">Contact</Button>
                            </Link>
                        </Jumbotron>
                    </div>
                </Container>
            </div>
            <Container className="y-margin">
                <Row>
                    <h2 className="new-collecion-head"><i className="fas fa-layer-group"></i> OUR NEW COLLECTION</h2>
                    <hr style={{width: '100%'}}/>
                    <small>* Collecion Name: "Spring is Here" - Photography: Haim Zadok - Place: Ramat Gan, Israel - Model: Moly - Assistant: Doron Arel</small>
                    <CardGroup>
                    {props.dresses.map(dress => {
                        return (
                            <Col key={dress._id} lg={4} md={6} sm={12}>
                                <Card
                                type={dress.type}
                                image={dress.image}
                                desc={dress.description}
                                stock={dress.inStock}
                                price={dress.price}
                                id={dress._id}/>                    
                            </Col>
                        )
                    })}
                    </CardGroup>   
                </Row>
            </Container>
            <Row noGutters>
                <YourDay />
            </Row>
            <Row noGutters>
                <Studio />
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);