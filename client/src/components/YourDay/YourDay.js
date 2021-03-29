import React, { Fragment } from 'react';

import { Container, Jumbotron } from 'react-bootstrap';

const YourDay = () => {
    return (
        <Fragment>
            <div className={"second-main"}>
                <Container>
                    <div>
                        <Jumbotron className="transparent">
                            <h1>Stay And Organize In Our Studio</h1>
                            <ul>
                                <li>Common and private organize rooms.</li>
                                <li>Equipped kitchen for your needs.</li>
                                <li>Special parking for the bride.</li>
                            </ul>
                            <h3>experience you will never forget</h3>
                        </Jumbotron>
                    </div>
                </Container>
            </div>
        </Fragment>
    )
}

export default YourDay;