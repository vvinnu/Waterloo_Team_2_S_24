import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/customisenoti';
import SimpleReactValidator from 'simple-react-validator';
// import './reg.css';
// import './log.css';
function Registration() {
    const navigate = useNavigate();
    const validator = new SimpleReactValidator();
    const [reg,setreg]=useState({});
    const [error,seterror]=useState({});
    let err={}
    const changeData=(event)=>{
        //console.log(event.target.name);
        //console.log(event.target.value);
     setreg({    
           ...reg,
           
            [event.target.name]:event.target.value,
        });
       
    }
 //   const [regData, setnewregData] = useState([]);
    
    const submitData=(e)=>{
        e.preventDefault();
    if (validator.allValid()) {
      
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(reg),
            headers: { "Content-Type": "application/json" }
        };
        fetch('http://localhost:3001/reg', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.id);
                if (data.status == 'Success') {
                    Notification({ message: data.message, position: 'right', type: 'success' });
                    navigate('/Login');
                  }
                  else {
                    Notification({ message: data.message, position: 'right', type: 'error' });
                  }
        });
    
        // if(!reg.email)
        // {
        //     err.email= "Please Enter Email";
        // }
        // else{
        //     err.email= "";
        // }
        // if(!reg.password)
        // {
        //     err.password="Please Enter Password";
        // }
        // else if(!(reg.password>=8))
        // {
        //     err.password="Password is less then 8";
        // }
        // else{
        //     err.password= "";
        // }
        // if(!reg.rpassword)
        // {
        //     err.rpassword="Please Enter Password";
        // }
        // else if(!(reg.rpassword==reg.password))
        // {
        //     err.rpassword="Password and repassword are not same";
        // }
        // else{
        //     err.rpassword= "";
        // }
        // if(!reg.mobile)
        // {
        //     err.mobile="Please Enter mobile";
        // }
        // else if(!(reg.mobile.length==10))
        // {
        //     err.mobile="Please Enter 10 digits";
        // }
        // else{
        //     err.mobile= "";
        // }
        // if(!reg.fname)
        // {
        //     err.fname= "Please Enter First name";
        // }
        // else{
        //     err.fname= "";
        // }
        // if(!reg.lname)
        // {
        //     err.lname= "Please Enter Last name";
        // }
        // else{
        //     err.lname= "";
        // }

        // if(!(reg.radiogroup1.value==1)||(reg.radiogroup1.value==0))
        // {
        //     err.radiogroup1= "Please Enter Last name";
        // }
        // else{
        //     err.radiogroup1= "";
        // }
        // if(!(reg.country.value==1)||(reg.country.value==2)||(reg.radiogroup1.value==3))
        // {
        //     err.country= "Please Enter Last name";
        // }
        // else{
        //     err.country= "";
        // }
        //seterror(err);
    } 
    else{
        Notification({ message: "Please fill data", position: 'right', type: 'error' });
      } 
    } 
    return <>
    <div className="space">
        <div className="form_wrapper">
            <div className="form_container">
                <div className="title_container">
                    <h2>Registration Form</h2>
                </div>
                <div className="row clearfix">
                    <div className="">
                        <form onSubmit={submitData}>
                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"> </i></span>
                                <input type="email" name="email" placeholder="Email"  onChange={changeData} />
                            </div> <span style={{color:'red'}}>{validator.showMessageFor('email')}{validator.message('email', reg.email, 'required|email')}</span>
                             
                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                <input type="password" name="password" placeholder="Password" onChange={changeData}/>
                            </div> <span style={{color:'red'}}>{validator.showMessageFor('password')}{validator.message('password', reg.password, 'required|min:4')}</span>
                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                <input type="password" name="rpassword" placeholder="Re-type Password" onChange={changeData} />
                            </div><span style={{color:'red'}}>{validator.showMessageFor('rpassword')}{validator.message('rpassword', reg.rpassword, 'required|min:4')}</span>                   
                            <div className="input_field"> <span><i aria-hidden="true" className="fa fa-phone"> </i></span>
                                <input type="tel" name="mobile" placeholder="Mobile-no"   onChange={changeData}/>
                            </div> <span style={{color:'red'}}>{validator.showMessageFor('mobile')}{validator.message('mobile', reg.mobile, 'required|size:10')}</span>   
                            <div className="row clearfix">
                                <div className="col_half">
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                        <input type="text" name="fname" placeholder="First Name" onChange={changeData}/>
                                    </div><span style={{color:'red'}}>{validator.showMessageFor('fname')}{validator.message('fname', reg.fname, 'required|alpha')}</span>   
                                </div>
                                <div className="col_half">
                                    <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                        <input type="text" name="lname" placeholder="Last Name"  onChange={changeData}/>
                                    </div><span style={{color:'red'}}>{validator.showMessageFor('lname')}{validator.message('lname', reg.lname, 'required|alpha')}</span>   
                                </div>
                            </div>                           
                                <br/>
                                <input className="button" type="submit" value="Register" onSubmit={submitData}/>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>;
}

export default Registration