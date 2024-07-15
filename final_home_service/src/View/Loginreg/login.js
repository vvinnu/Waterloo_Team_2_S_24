import React, { useState } from 'react';
import Notification from '../Notification/customisenoti';
import { useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

function Login() {
    const [login, setLogin] = useState({});
    const validator = new SimpleReactValidator();
    const navigate = useNavigate();

    const changeData = (event) => {
        setLogin({
            ...login,
            [event.target.name]: event.target.value,
        });
    };

    const submitData = (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(login),
                headers: { "Content-Type": "application/json" }
            };
            fetch('http://localhost:3001/login', requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'Success') {
                        localStorage.setItem('user', JSON.stringify(data.user));
                        navigate('/');
                        window.location.reload();
                    } else {
                        Notification({ message: data.message, position: 'right', type: 'error' });
                        localStorage.removeItem('user');
                    }
                });
        } else {
            validator.showMessages();
            Notification({ message: "Please fill data correctly", position: 'right', type: 'error' });
        }
    };

    return (
        <>
            <div className="space">
                <div className="form_wrapper">
                    <div className="form_container">
                        <div className="title_container" style={{ marginBottom: '-72px', fontSize: '20px' }}>
                            <h1>Login</h1>
                        </div>
                        <div className="row clearfix">
                            <div className="">
                                <form onSubmit={submitData}>
                                    <div className="row clearfix">
                                        <div>
                                            <div className="input_field">
                                                <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                                <input type="text" name="username" placeholder="Username" onChange={changeData} />
                                            </div>
                                            <span style={{ color: 'red' }}>{validator.message('username', login.username, 'required')}</span>
                                        </div>
                                    </div>
                                    <div className="input_field">
                                        <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                        <input type="password" name="password" placeholder="Password" onChange={changeData} />
                                    </div>
                                    <span style={{ color: 'red' }}>{validator.message('password', login.password, 'required|min:4')}</span>
                                    <div className="form-group d-md-flex my-dcus-flex t_b_margin_20">
                                        <div id="forgot" className='mar_right_20'>
                                            <a href="/Forgot" style={{ color: 'black', fontSize: '15px', paddingLeft: '216px', marginLeft: '-213px' }}>Forgot Password</a>
                                        </div>
                                    </div>
                                    <input className="button" type="submit" value="Login" style={{ color: 'black' }} onSubmit={submitData} />
                                    <div className="social-media">
                                        <br />
                                        <span className="acc">
                                            <a href="/Registration" className='newpage'>Not a member?</a>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
