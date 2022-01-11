import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from './../../App';

const TNav = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log('');
    
    return (
        <Container>
            <Navbar expand="lg">
                <Navbar.Brand as={Link} to="/">QA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/take" className='nav-link'>Take Attedance</Link>
                        {
                            loggedInUser?.email==='atik@gmail.com' && 
                            <Link to="/admin" className='nav-link'> Admin </Link>
                        }
                        
                        {
                            loggedInUser?.isSignedIn ?
                            <Link to="/login" className='nav-link btn btn-primary px-4 mr-0 log-btn'>{loggedInUser?.name && loggedInUser.name} </Link>
                            :
                            <Link to="/login" className='nav-link btn btn-primary px-4 mr-0 log-btn'>Login</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default TNav;