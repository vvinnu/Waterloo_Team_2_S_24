import React, { useEffect, useState } from "react";
import Script from "./Script/Script";
import SimpleReactValidator from 'simple-react-validator';
import DataTable from 'react-data-table-component';
import Notification from './Notification/customisenoti';
import {useNavigate} from 'react-router-dom'
function Location() {
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
  const [citylist, setCityList] = useState([]);

  const getcity = () => {

    fetch('http://localhost:4001/getCity')
      .then(response => response.json())
      .then(data => {
        console.log("City");
        console.log(data);
        setCityList(data);
      })
  }
  const [city, setCity] = useState({});
  const [cerror, setCerror] = useState({});
  const changecityData = (event) => {
    //console.log(event.target.name);
    //console.log(event.target.value);
    setCity({
      ...city,

      [event.target.name]: event.target.value,
    });

  }
  const validator = new SimpleReactValidator();

  const submitCityData = (e) => {
    e.preventDefault();
    // if (validator.allValid()) {
      if(admindata!=null){
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(city),
      headers: { "Content-Type": "application/json" }
    };
    fetch('http://localhost:4001/city', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data.id);
        if (data.status == 'Success') {
          setsubmit(1);
          Notification({ message: data.message, position: 'right', type: 'success' });
          setCity({});
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
    //   cvalidator.showMessages();
    //   let erroes = {}
    //   if (!cvalidator.fieldValid('name')) {
    //     erroes.name = cvalidator.message('name', city.name, 'required').props['children']
    //   }
    //   setCerror(erroes);
    // }
  }

  const deletecityData = (id) => {
    // e.preventDefault();
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ cityid: id }),
      headers: { "Content-Type": "application/json" }
    };
    
    fetch('http://localhost:4001/delcity', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status == 'Success') {
          setResponse((response) => response + 1);
          Notification({ message: data.message, position: 'right', type: 'success' });
        }
        else {
          Notification({ message: data.message, position: 'right', type: 'error' });
        }
      })
  }

  const columns2 = [
    {
      name: 'State Name',
      selector: row => row.sta_name,
      sortable: true,
    },
    {
      name: 'Country Name',
      selector: row => row.con_name,
      sortable: true,
    },
    {
      name: 'City Name',
      selector: row => row.city_name,
      sortable: true,
    },
    {
      name: 'Action',
      selector: row =><> <a href={`/editcity/${row.city_id}`} className="fa fa-edit " style={{ fontSize: '30px', cursor: 'pointer' , color:'black'}}>  </a> <i class="fa fa-trash-o" onClick={() => deletecityData(row.city_id)} style={{ fontSize: '30px', cursor: 'pointer' , marginLeft:'20px'}}></i> </>,
      sortable: true,
    },
  ];



  useEffect(() => {
    getcountry();
    getstate();
    getcity();
    setCity({});
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
                    <h4 className="card-title">City Name</h4>
                    {/* <p className="card-description"> Basic form layout </p> */}
                    <form className="forms-sample">
                      <label className="col-md-12 col-form-label" style={{padding:'0px 0px' , marginBottom:'7px'}}>Country</label>
                      <div className="col-md-12" style={{padding:'0px 0px'}}>
                      <select className="form-control" name="con_id" value={city.con_id ? city.con_id : ""} onChange={changecityData}>
                      <option>Select Country</option>
                      {countrylist && countrylist.map((val, i) => {
                            return (<option value={val.con_id}>{val.con_name}</option>)
                          })}
                        </select>
                      </div>
                      {/* <span style={{ color: 'red' }}>{validator.showMessageFor('con_id')}{validator.message('con_id', city.con_id, 'required|email')}</span> */}
                      <br />

                      <label className="col-md-12 col-form-label" style={{padding:'0px 0px' , marginBottom:'7px'}}>State</label>
                      <div className="col-md-12" style={{padding:'0px 0px'}}>
                        <select className="form-control" name="sta_id" value={city.sta_id ? city.sta_id : ""} onChange={changecityData}>
                        <option>Select State</option>
                          {statelist && statelist.map((val, i) => {
                            return (<option value={val.sta_id}>{val.sta_name}</option>)
                          })}
                        </select>
                      </div>
                      {/* <span style={{ color: 'red' }}>{validator.showMessageFor('sta_id')}{validator.message('sta_id', city.sta_id, 'required|email')}</span> */}
                      
                      <br />

                      <div className="form-group">
                        <label htmlFor="exampleInputUsername1">City Name</label>
                        <input type="text" className="form-control" value={city.name ? city.name : "" } id="exampleInputUsername1" name="name" placeholder="City Name" onChange={changecityData} />
                      <span style={{ color: 'red' }}>{validator.showMessageFor('name')}{validator.message('name', city.name, 'required|alpha')}</span>
                      
                      </div>
                      <button type="submit" className="btn btn-primary mr-2" onClick={submitCityData}>Add City</button>
                      <button className="btn btn-dark">Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">City List</h4>
                    <div class="table-responsive">
                    <DataTable columns={columns2} data={citylist} theme="solarized" pagination />
                      {/* <table class="table table-striped">

                        <tr>
                            <td>Id</td>
                          <td>Country id</td>
                          <td>State id</td>
                          <td>Name</td>
                        </tr> */}
                        {/* {console.log("city list")}
                  {console.log(citylist)} */}
                        {/* {citylist && citylist.map((val, i) => {
                          return (
                            <tr>
                              <td>{val.city_id}</td>
                              <td>{val.con_id}</td>
                              <td>{val.sta_id}</td>
                              
                              <td>{val.city_name}</td>
                              <td><span><i class="fa fa-trash-o" onClick={() => deleteData(val.city_id)} style={{ fontSize: '30px', cursor: 'pointer' }}></i></span></td>

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

export default Location