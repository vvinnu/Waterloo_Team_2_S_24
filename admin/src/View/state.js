import React, { useEffect, useState } from "react";
import Script from "./Script/Script";
import SimpleReactValidator from 'simple-react-validator';
import DataTable from 'react-data-table-component';
import Notification from './Notification/customisenoti';
import {useNavigate} from 'react-router-dom'

function State() {

  const admindata = localStorage.getItem('user');
  const navigator = useNavigate();
  const [countrylist, setCountryList] = useState([]);
  const [response, setResponse] = useState(0);
  const [submit, setsubmit] = useState(0);
  const getcountry = () => {

    fetch('http://localhost:4001/getcountry')
      .then(response => response.json())
      .then(data => {
        console.log("country");
        console.log(data);
        setCountryList(data);
      })
  }
  const validator = new SimpleReactValidator();

  const [statelist, setStateList] = useState([]);

  const getstate = () => {

    fetch('http://localhost:4001/getState')
      .then(response => response.json())
      .then(data => {
        console.log("state");
        console.log(data);
        setStateList(data);
      })
  }
  const [state, setState] = useState({});
  const [serror, setSerror] = useState({});
  const changeStateData = (event) => {
    //console.log(event.target.name);
    // alert(event.target.value);
    setState({
      ...state,

      [event.target.name]: event.target.value,
    });

  }
  const statevalidator = new SimpleReactValidator();

  const submitStateData = (e) => {
    e.preventDefault();
    // alert("HH");
    // alert(validator.allValid());
    // if (validator.fieldValid() && validator.fieldValid()) {
      if(admindata!=null){
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(state),
      headers: { "Content-Type": "application/json" }
    };
    //   console.log("state DATAA");
    //   console.log(state);
    fetch('http://localhost:4001/state', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data.id);
        if (data.status == 'Success') {
          setsubmit((submit) => submit + 1);
          Notification({ message: data.message, position: 'right', type: 'success' });
        }
        else {
          Notification({ message: data.message, position: 'right', type: 'error' });
        }
      })
    }
      else{
        navigator('/Login');
        Notification({ message: 'Please Login First', position: 'right', type: 'error' });
      }
     
    // }
    // else {
    //   validator.showMessages();
    //   let erroes = {}
    //   if (!statevalidator.fieldValid('name')) {
    //     erroes.name = statevalidator.message('name', country.name, 'required').props['children']
    //   }
    //   setSerror(erroes);
    // }
  }
  
  const deletestateData = (id) => {
    // e.preventDefault();
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ staid: id }),
      headers: { "Content-Type": "application/json" }
    };
    fetch('http://localhost:4001/delstate', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status == 'Success') {
          setResponse((response) => response + 1);
          Notification({ message: data.message, position: 'right', type: 'success' });
          setState({});
        }
        else {
          Notification({ message: data.message, position: 'right', type: 'error' });
        }
      })
  }

  const columns1 = [
    {
      name: 'Country Name',
      selector: row => row.con_name,
      sortable: true,
    },
    {
      name: 'State Name',
      selector: row => row.sta_name,
      sortable: true,
    },
    {
      name: 'Action',
      selector: row => <><a href={`/editstate/${row.sta_id}`} className="fa fa-edit " style={{ fontSize: '30px', cursor: 'pointer' , color:'black'}}> </a> <i class="fa fa-trash-o" onClick={() => deletestateData(row.sta_id)} style={{ fontSize: '30px', cursor: 'pointer', marginLeft:'20px' }}></i> </>,
      sortable: true,
    },
  ];


  useEffect(() => {
    getcountry();
    getstate();
    setState({});
  }, [response,submit]);
  return <>
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper" id="location">
            <div className="page-header">
              <h3 className="page-title"> Location </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  {/* <li className="breadcrumb-item"><a href="#">Forms</a></li> */}
                  <li className="breadcrumb-item active" aria-current="page">Location </li>
                </ol>
              </nav>
            </div>
            <div className="row">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">State Name</h4>
                    {/* <p className="card-description"> Basic form layout </p> */}
                    <form className="forms-sample" >
                      <label className="col-md-12 col-form-label" style={{padding:'0px 0px' , marginBottom:'7px'}}>Country</label>
                      <div className="col-md-12" style={{padding:'0px 0px'}}>
                      <select  className="form-control" name="con_id" value={state.con_id ? state.con_id : ""}  onChange={changeStateData}>
                      <option>Select Country</option>
                      {countrylist && countrylist.map((val, i) => {
                          
                            return (<option value={val.con_id}>{val.con_name}</option>)
                          })}
                       
                       </select>

                      </div>
                      {/* <span style={{ color: 'red' }}>{validator.showMessageFor('con_id')}{validator.message('con_id', state.con_id, 'required|alpha')}</span> */}
                      <br />
                      <div className="form-group">
                        <label htmlFor="exampleInputUsername1">State Name</label>
                        <input type="text" className="form-control" value={state.name ? state.name : ""} id="exampleInputUsername1" name="name" placeholder="State Name" onChange={changeStateData} />
                        <span style={{ color: 'red' }}>{serror.name}{validator.message('name', state.name, 'required')}</span>
                        <span style={{ color: 'red' }}>{validator.showMessageFor('name')}{validator.message('name', state.name, 'required|alpha')}</span>
                      
                      </div>
                      
                      <button type="submit" className="btn btn-primary mr-2" onClick={submitStateData}>Add State</button>
                      <button className="btn btn-dark">Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">State List</h4>
                    <div class="table-responsive">
                    <DataTable columns={columns1} data={statelist} theme="solarized" pagination />
                      {/* <table class="table table-striped"> */}

                        {/* <tr>
                          <td>Id</td>
                          <td>Country id</td>
                          <td>Name</td>
                        </tr> */}
                        {/* {console.log("State list")}
                  {console.log(statelist)} */}
                        {/* {statelist && statelist.map((val, i) => {
                          return (
                            <tr>
                                <td>{val.sta_id}</td>
                              <td>{val.con_id}</td>
                              
                              <td>{val.sta_name}</td>
                            </tr>)
                        })}
                      </table> */}
                    </div>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Script />
  </>
}

export default State