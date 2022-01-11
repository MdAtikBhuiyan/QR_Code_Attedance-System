import React from 'react';
import '../style.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBook, faCalendarCheck, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/home.png'

const Home = () => {
    const history = useHistory();
    const handleGetClick = () => {
        history.push('/login')
    }
    return (
        <div className='home'>

            <Row>
                <Col md={6}>
                    <div className='description text-center'>
                        <h1> <span> Welcome </span> to <br /> <span className='text-warning'> QR</span> Code <span className='text-warning'> Attedance </span> System</h1>
                        <div className="icon mt-3" >
                            <FontAwesomeIcon icon={faAddressCard} />
                            <FontAwesomeIcon icon={faChalkboardTeacher} />
                            <FontAwesomeIcon icon={faCalendarCheck} />
                            <FontAwesomeIcon icon={faBook} />
                        </div>
                        <div>
                            <button onClick={handleGetClick} className="btn btn-warning mt-5">Click Here</button>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='container'>
                        <img src={logo} alt="" />
                    </div>
                </Col>
            </Row>

        </div>
    );
};

export default Home;