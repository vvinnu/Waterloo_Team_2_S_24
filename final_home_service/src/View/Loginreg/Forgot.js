import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/customisenoti';
import SimpleReactValidator from 'simple-react-validator';

function Forgot() {
    const navigate=useNavigate();

    const [email,setEmail]=useState('');
    const validator = new SimpleReactValidator();
    localStorage.removeItem('otp');
    const backfromhere = ()=>{
        navigate('/Login');
    }
    const sendotp=()=>{
        if (validator.allValid()) {
        let formdata=new FormData();
        formdata.append('email',email);
        let option={
            method:'POST',
            body:formdata,
        }
        fetch('http://localhost:3001/sendotp',option)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.status=='success')
            {
                localStorage.setItem('otp',data.otp);
                Notification({ message: data.message, position: 'right', type: 'success' });
                navigate('/Otp');
            }   
            else{
                Notification({ message: data.message, position: 'right', type: 'error' });
            }
        });
    }
    else{
        Notification({ message: "Please fill data", position: 'right', type: 'error' });
      }
    }
    return <>
         <div className="space">
        <div className="form_wrapper">
            <div className="form_container">
                <div className="title_container" style={{marginBottom:'-72px',fontSize:'20px'}}>
                    <h1>Forgot Password</h1>
                </div>
                <div className="row clearfix">
                    <div className="">
                        <form>
                        <div className="row clearfix">
                                <div>
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
                                        <input type="text" name="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                                    </div>
                                    {/* <span style={{color:'red'}}>{validator.showMessageFor('email')}{validator.message('email', email.email, 'required|email')}</span> */}
                                </div>
                            </div> 
                            <div className="row clearfix">
                            <div className="col_half">
                            <input className="button" type="button" value="Send" width="10px" onClick={sendotp} style={{color:'black'}}  /></div>
                            <div className="col_half"> <input className="button" type="submit" onClick={backfromhere} value="Cancel" style={{color:'black'}}  /></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>;
}

export default Forgot