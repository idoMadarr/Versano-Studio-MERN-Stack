import React from 'react';

import { Container, Row, Col, Image } from 'react-bootstrap';
import studioImg from './studio-versano.jpeg';

const Studio = () => {
    return (
        <Container className="margin-studio">
            <Row noGutters>
                <Col lg={3} md={12}>
                    <p>
                        Where: Versano Studio located in Rishon Lezion, Oranim street 54, Israel.
                    </p>
                    <p>
                        About: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus
                        dignissim erat, sed vestibulum ex mattis id. Nunc rhoncus,
                        velit nec blandit elementum, massa velit venenatis diam, eget efficitur
                        nunc sapien nec erat.
                    </p>
                    <p>
                        Why Versano: Donec erat arcu, vestibulum nec mi nec, tristique congue magna.
                        Vestibulum eleifend laoreet neque. elementum, massa velit venenatis diam, eget efficitur
                        nunc sapien nec erat.
                    </p>    
                    <p>
                        Summary: Tristique congue magna, Vestibulum eleifend laoreet neque. 
                    </p>  
                </Col>
                <Col lg={6} md={12}>
                    <div className="studio-img">
                        <Image src={studioImg} thumbnail /* roundedCircle */ alt="studio"/>
                    </div>
                </Col>
                <Col lg={3} md={12}>
                    <ul>
                        <li><i className="fas fa-check-double"></i> one life experience</li>
                        <li><i className="fas fa-check-double"></i> champagne on the house</li>
                        <li><i className="fas fa-check-double"></i> parking include</li>
                        <li><i className="fas fa-check-double"></i> an amazing city landscape</li>
                        <li><i className="fas fa-check-double"></i> breckfast</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default Studio;