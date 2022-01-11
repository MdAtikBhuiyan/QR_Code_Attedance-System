import React, { useContext, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import logo from '../../images/sign-in-logo.png'
import { useHistory, useLocation } from 'react-router';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from './../../App';
import login from '../../images/login.jpg'
import TNav from '../TeacherNav/TNav';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const [option, setoption] = useState('login');

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        isSignedIn: false,
        error: ''
    });

    const { register, errors, handleSubmit, watch } = useForm({});
    const password = useRef({});
    password.current = watch("password", "");


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/take" } };

    const signupSubmit = async data => {

        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                var user = userCredential.user;
                var { displayName, email } = userCredential.user;
                const userDetails = { ...user }
                userDetails.name = displayName;
                userDetails.isSignedIn = true;
                userDetails.email = email;
                setUser(userDetails);
                setLoggedInUser(userDetails);
                history.replace(from);
                updateUserName(data.name);
                console.log('object', userCredential.user);
            })
            .catch((error) => {
                console.log(error.code, error.message);
                const userDetails = { ...user }
                userDetails.error = error.message;
                setUser(userDetails);
                // setLoggedInUser(userDetails);
            });
    };


    const loginSubmit = values => {
        console.log(values);

        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then((userCredential) => {
                var user = userCredential.user;
                var { displayName, email } = userCredential.user;
                const userDetails = { ...user }
                userDetails.name = displayName;
                userDetails.isSignedIn = true;
                userDetails.email = email;
                setUser(userDetails);
                setLoggedInUser(userDetails);
                history.replace(from);
                console.log('signinuser', user);
            })
            .catch((error) => {
                console.log(error.code, error.message);
                const userDetails = { ...user }
                userDetails.error = error.message;
                setUser(userDetails);
                setLoggedInUser(userDetails);
            });
    };

    const updateUserName = (name) => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log('Update successful.');
        }).catch(function (error) {
            console.log(error.code, error.message);
        });
    }

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            const signOutUser = { ...user };
            signOutUser.name = '';
            signOutUser.email = '';
            signOutUser.password = '';
            signOutUser.isSignedIn = false;
            setUser(signOutUser);
            setLoggedInUser(signOutUser)
        }).catch((error) => {
            // An error happened.
        });
    }

    console.log('3', user);
    console.log('login', user.isSignedIn);

    return (
        <div className='login-area'>

            {
                loggedInUser.isSignedIn ?
                    <div className='logout-area bg-info'>
                        <TNav />
                        <div className='logout-info'>
                            <p>Already Logged In</p>
                            <button onClick={signOut} className="btn btn-danger">Logout</button>
                        </div>
                    </div>
                    :
                    <Row>
                        <Col md={7}>
                            <div>
                                <img src={login} alt="" />
                            </div>
                        </Col>
                        <Col md={5}>
                            <div className="login-content">
                                <img src={logo} alt="" />
                                <div className="login-main">

                                    {
                                        option === 'login' &&
                                        <div className="signIn-area">
                                            <h3> Sign In</h3>
                                            <form onSubmit={handleSubmit(loginSubmit)}>
                                                <label>Email</label>
                                                <input
                                                    name="email"
                                                    placeholder="Email"
                                                    className='form-control'
                                                    ref={register({
                                                        required: "Required",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "invalid email address"
                                                        }
                                                    })}
                                                />
                                                <p style={{ color: '#ff0052' }}>{errors.email && errors.email.message}</p>

                                                <label>Password</label>
                                                <input
                                                    name="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    className='form-control'
                                                    ref={register({
                                                        required: "Reuired",
                                                        minLength: {
                                                            value: 8,
                                                            message: "Password must have at least 8 characters"
                                                        }
                                                    })}
                                                />
                                                <p style={{ color: '#ff0052' }}>{errors.password && <span>{errors.password.message}</span>}</p>

                                                <p style={{ color: '#ff0052' }}> {user.error} </p>

                                                <button type="submit" className='btn col btn-primary login-btn'>Sign In</button>
                                            </form>

                                            <p className='optional-option'>Don’t have an account?  <button onClick={() => {
                                                user.error = '';
                                                setoption('signup');

                                            }}>
                                                Sign Up</button> </p>


                                        </div>

                                    }

                                    {
                                        option === 'signup' &&
                                        <div className="signUp-area">
                                            <h3> Sign Up</h3>

                                            <form onSubmit={e => e.preventDefault()}>

                                                <label>Name</label>
                                                <input name="name"
                                                    placeholder="Name"
                                                    className='form-control'
                                                    ref={register({ required: true })} />
                                                <p style={{ color: '#ff0052' }}>{errors.name && "Reuired"}</p>

                                                <label>Email</label>
                                                <input
                                                    name="email"
                                                    placeholder="Email"
                                                    className='form-control'
                                                    ref={register({
                                                        required: "Required",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "invalid email address"
                                                        }
                                                    })}
                                                />
                                                <p style={{ color: '#ff0052' }}> {errors.email && errors.email.message}</p>

                                                <label>Password</label>
                                                <input
                                                    name="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    className='form-control'
                                                    ref={register({
                                                        required: "You must specify a password",
                                                        minLength: {
                                                            value: 8,
                                                            message: "Password must have at least 8 characters"
                                                        }
                                                    })}
                                                />
                                                <p style={{ color: '#ff0052' }}>{errors.password && <span>{errors.password.message}</span>}</p>

                                                <label>Confirm Password</label>
                                                <input
                                                    name="password_repeat"
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    className='form-control'
                                                    ref={register({
                                                        validate: value =>
                                                            value === password.current || "The passwords do not match"
                                                    })}
                                                />
                                                <p style={{ color: '#ff0052' }}> {errors.password_repeat && <span>{errors.password_repeat.message}</span>}</p>

                                                <p style={{ color: '#ff0052' }}> {user.error} </p>

                                                <input type="submit" onClick={handleSubmit(signupSubmit)} className='btn col btn-primary login-btn' value='Sign Up' />
                                            </form>
                                            <p className='optional-option'>Already have an account?  <button onClick={() => {
                                                user.error = '';
                                                setoption('login');
                                            }}>Login</button> </p>

                                        </div>
                                    }

                                </div>
                            </div>
                        </Col>
                    </Row>
            }
        </div>
    );
};

export default Login;