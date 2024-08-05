import React, { useState } from 'react';
import Notification from '../Notification/customisenoti';
import { useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
function Resetpass() {
    const navigate = useNavigate();
    const validator = new SimpleReactValidator();
    const [passform, setPassForm] = useState();
    const setpassword = (e) => {
        setPassForm({
            ...passform,
            [e.target.name]: e.target.value,
        });
    }
    const setnewpassword = () => {
        if (passform!=null) {
            console.log(passform);
            if (passform.password == passform.cpassword) {
                let formdata = new FormData();
                formdata.append('otp', localStorage.getItem('otp'));
                formdata.append('password', passform.password);
                let option = {
                    method: 'POST',
                    body: formdata,
                };
                fetch('http://localhost:3001/updatepassword', option)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.status == 'success') {
                            localStorage.removeItem('otp');
                            Notification({ message: data.message, position: 'right', type: 'success' });
                            navigate('/Login');
                        }
                        else {
                            Notification({ message: data.message, position: 'right', type: 'error' });
                        }
                    });
            }
            else {

                Notification({ message: "Password_and_Re-password_doesn't_match...", position: 'right', type: 'error' });
            }

        }
        else {
            Notification({ message: "Please_fill_data", position: 'right', type: 'error' });
        }
    }
    const cancle = () => {
        navigate('/');
    }
    return <>
        <div className="space">
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container" style={{ marginBottom: '-72px', fontSize: '20px' }}>
                        <h1>Reset Password</h1>
                    </div>
                    <div className="row clearfix">
                        <div className="">
                            <form>
                                <div className="row clearfix">
                                    <div>
                                        <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                            <input type="password" name="password" placeholder="New Password" onChange={setpassword} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                            <input type="password" name="cpassword" placeholder="Confirm Password" onChange={setpassword} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col_half">
                                        <input className="button" type="button" onClick={setnewpassword} value="Save" width="10px" style={{ color: 'black' }} /></div>
                                    <div className="col_half"> <input onClick={cancle} className="button" type="button" value="Cancel" style={{ color: 'black' }} /></div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default Resetpass