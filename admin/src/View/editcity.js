import React, { useEffect, useState } from "react";
import Script from "./Script/Script";
import { useParams } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import DataTable from 'react-data-table-component';
import Notification from './Notification/customisenoti';
function Editcity() {

    let {id} = useParams();

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
  const cvalidator = new SimpleReactValidator();

  const submitCityData = (e) => {
    e.preventDefault();
    let data = new FormData();
    console.log("city");
    console.log(city);
    data.append('con_id', city.con_id);
     data.append('sta_id', city.sta_id);
    data.append('city_id',city.city_id);
     data.append('city_name', city.city_name);
     console.log("formdata");
     console.log(data);
    let option = {
      method: 'POST',
      body: data
    }
    console.log("option");
    console.log(option);
    fetch('http://localhost:4001/updatecity', option)
      .then(response => response.json())
      .then(data => {
        console.log(data.id);
        if (data.status == 'Sucsess') {
            setsubmit((submit) => submit + 1);
            Notification({ message: data.message, position: 'right', type: 'success' });
          }
          else {
              Notification({ message: data.message, position: 'right', type: 'error' });
          }
      });
  }

  const getsinglecity = (id) =>{
  fetch(`http://localhost:4001/editcity/${id}`)
  .then(response => response.json())
    .then(data => {
        console.log("data");
      console.log(data[0]);
      let mydata= {};
      Object.keys(data[0]).map((key)=>{
          mydata={
              ...mydata,
              [key]:data[0][key]
          };
      })
      setCity(mydata);
  });
}
useEffect(() => {
    getcountry();
    getstate();
    getcity();
    getsinglecity(id);
  }, [submit]);
  return <>
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper" style={{marginRight: '954px',width: '1108px',marginLeft: '-123px'}}>
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
                      <select className="form-control" name="con_id" value={city.con_id} onChange={changecityData}>
                      {countrylist && countrylist.map((val, i) => {
                       
                          
                            return (<option value={val.con_id}>{val.con_name}</option>)
                            
                          })}
                        </select>
                      </div><br />

                      <label className="col-md-12 col-form-label" style={{padding:'0px 0px' , marginBottom:'7px'}}>State</label>
                      <div className="col-md-12" style={{padding:'0px 0px'}}>
                        <select className="form-control" name="sta_id" value={city.sta_id} onChange={changecityData}>
                          {statelist && statelist.map((val, i) => {
                            return (<option value={val.sta_id}>{val.sta_name}</option>)
                          })}
                        </select>
                      </div><br />

                      <div className="form-group">
                        <label htmlFor="exampleInputUsername1">City Name</label>
                        <input type="text" className="form-control" value={city.city_name} id="exampleInputUsername1" name="city_name" placeholder="City Name" onChange={changecityData} />
                        {/* <span style={{ color: 'red' }}>{cerror.name}{validator.message('name', city.name, 'required')}</span> */}
                      </div>
                      <button type="submit" className="btn btn-primary mr-2" onClick={submitCityData}>Add City</button>
                      <button className="btn btn-dark">Cancel</button>
                    </form>
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

export default Editcity