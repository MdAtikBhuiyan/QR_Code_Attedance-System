import React, { useRef, useState } from 'react';
import TNav from '../TeacherNav/TNav';
import { Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import QRCode from 'react-qr-code';
const Take = () => {


    const [value, onChange] = useState(new Date());

    const { register, errors, handleSubmit, watch } = useForm({});
    const password = useRef({});
    password.current = watch("password", "");

    const [display, setDsiplay] = useState('d-none');

    const [allValue, setAllValue] = useState('')

    const take = (data) => {
        console.log(data);
        setAllValue({
            date: value,
            courseCode: data.course,
            section: data.section,
        });
        setDsiplay('d-block');
    }

    // console.log(value);
    console.log('j', allValue);



    return (
        <div className='takes-area bg-info'>
            <TNav />
            <Container className='take-cont'>

                <h4 className='mt-5 text-center text-danger'>Generate Your Attedance QR Code</h4>

                <Row className='my-4'>
                    <Col md={6}>
                        <div className="take-form mt-3">

                            <form onSubmit={handleSubmit(take)}>

                                <label> Tap to Select Date </label> <br />
                                <div className="calender">
                                    <Calendar
                                        onChange={onChange}
                                        value={value}
                                    />
                                </div>

                                <label className='mt-3'>Enter Course Code</label>
                                <input name="course"
                                    placeholder="Course Code"
                                    className='form-control'
                                    ref={register({ required: true })} />
                                <p style={{ color: '#ff0052' }}>{errors.course && "Reuired"}</p>

                                <label>Enter Section</label>
                                <input name="section"
                                    placeholder="Section"
                                    className='form-control'
                                    ref={register({ required: true })} />
                                <p style={{ color: '#ff0052' }}>{errors.section && "Reuired"}</p>

                                <button type="submit" className='btn col btn-primary login-btn'>Show QR</button>
                            </form>

                        </div>
                    </Col>

                    <Col md={6}>
                        <div className='qr-area text-center'>
                            <div className={display}>
                                <QRCode value={JSON.stringify(allValue)} />

                            </div>
                        </div>
                    </Col>

                </Row>
            </Container>
        </div>
    );
};

export default Take;