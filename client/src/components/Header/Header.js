import React,{ Fragment } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/action';

import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const Header = props => {
    return (
        <Fragment>
            <Navbar className="navbar" fixed="top" bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><i className="fas fa-feather-alt fa-lg" style={{padding: '0rem'}}></i> Versano</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to={'/'}>
                            <Nav.Link><i className="fas fa-home"></i> Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={'/contact'}>
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Collections" id="basic-nav-dropdown">
                        <LinkContainer to={'/collection-2020'}>
                            <NavDropdown.Item>Collection 2020</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                            <NavDropdown.Item>Collection 2021<small>- soon -</small></NavDropdown.Item>
                        </NavDropdown>
                        {props.isAdmin ? (
                            <NavDropdown title="Admin" id="basic_nav_dropdown" className="nav-right">
                                <LinkContainer to={'/login'}>
                                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <LinkContainer to={'/'}>
                                    <NavDropdown.Item onClick={() => props.logout()}>Logout</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to={'/login'} className="nav-right">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAdmin: state.isAdmin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(action.adminLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);