import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Script from "./Script/Script";
import SimpleReactValidator from 'simple-react-validator';
import Notification from './Notification/customisenoti';
import {useNavigate} from 'react-router-dom'
function Editcountry() {
const navigate = useNavigate()
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
  const [country, setCountry] = useState({});
  const [error, setError] = useState({});
  const changeData = (event) => {
    //console.log(event.target.name);
    //console.log(event.target.value);
    setCountry({
      ...country,

      [event.target.name]: event.target.value,
    });

  }
  const validator = new SimpleReactValidator();

  const submitData = (e) => {
    e.preventDefault();
    let data = new FormData();
    console.log("country");
    console.log(country);
    data.append('con_id',country.con_id);
     data.append('con_name', country.con_name);
    //  data.append('files',cate.file);
     console.log("formdata");
     console.log(data);
    let option = {
      method: 'POST',
      body: data
    }
    console.log("option");
    console.log(option);
    fetch('http://localhost:4001/updatecountry', option)
      .then(response => response.json())
      .then(data => {
        console.log(data.id);
        if (data.status == 'Sucsess') {
            setsubmit((submit) => submit + 1);
            Notification({ message: data.message, position: 'right', type: 'success' });
            navigate('/Country')
          }
          else {
            Notification({ message: data.message, position: 'right', type: 'error' });
          }
      });
  }

  const getsinglecountry = (id) =>{
  
  fetch(`http://localhost:4001/editcountry/${id}`)
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
      setCountry(mydata);
  });
}



  useEffect(() => {
    getsinglecountry(id);
    getcountry();
  }, [response,submit]);
  return <>
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper" style={{marginRight: '954px',width: '1108px',marginLeft:'-123px'}}>
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
                    <h4 className="card-title">Country</h4>
                    {/* <p className="card-description"> Basic form layout </p> */}
                    <form className="forms-sample">
                      <div className="form-group">
                        <label htmlFor="exampleInputUsername1">Country Name</label>
                        <input type="text" className="form-control" value={country.con_name} id="exampleInputUsername1" name="con_name" placeholder="Country Name" onChange={changeData} />
                        <span style={{ color: 'red' }}>{error.name}{validator.message('name', country.name, 'required')}</span>
                      </div>
                      <button type="submit" className="btn btn-primary mr-2" onClick={submitData}>Add Country</button>
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

export default Editcountry