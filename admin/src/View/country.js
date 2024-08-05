import React, { useEffect, useState } from "react";
import Script from "./Script/Script";
import SimpleReactValidator from 'simple-react-validator';
import DataTable from 'react-data-table-component';
import Notification from './Notification/customisenoti';
import {useNavigate} from 'react-router-dom'

function Country() {
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
    if(admindata!=null){
      if (validator.allValid()) {
        const requestOptions = {
          method: 'POST',
          body: JSON.stringify(country),
          headers: { "Content-Type": "application/json" }
        };
        fetch('http://localhost:4001/country', requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data.id);
            if (data.status == 'Success') {
              setsubmit((submit) => submit + 1);
              Notification({ message: data.message, position: 'right', type: 'success' });
              setCountry({});
            }
            else {
              Notification({ message: data.message, position: 'right', type: 'error' });
            }
          });
      }
      else {
        Notification({ message: 'Please fill details', position: 'right', type: 'error' });
        validator.showMessages();
        let erroes = {}
        if (!validator.fieldValid('name')) {
          erroes.name = validator.message('name', country.name, 'required').props['children']
        }
        setError(erroes);
      }
    }
    else{
      navigator('/Login');
      Notification({ message: 'Please Login First', position: 'right', type: 'error' });
    }
   
  }
  const deleteData = (id) => {
    // e.preventDefault();
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ conid: id }),
      headers: { "Content-Type": "application/json" }
    };
    console.log(country);
    fetch('http://localhost:4001/delcountry', requestOptions)
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

  const columns = [
    {
      name: 'Country Name',
      selector: row => row.con_name,
      sortable: true,
    },
    {
      name: 'Edit',
      selector: row => <><a href={`/editcountry/${row.con_id}`} className="fa fa-edit " style={{ fontSize: '30px', cursor: 'pointer' , color:'black'}}>  </a> 
      <i class="fa fa-trash-o" onClick={() => deleteData(row.con_id)} style={{ fontSize: '30px', cursor: 'pointer', marginLeft:'20px' }}></i> </>,
      sortable: true,
    },
  ];
  useEffect(() => {
    getcountry();
    setCountry({});
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
                    <h4 className="card-title">Country</h4>
                    {/* <p className="card-description"> Basic form layout </p> */}
                    <form className="forms-sample">
                      <div className="form-group">
                        <label htmlFor="exampleInputUsername1">Country Name</label>
                        <input type="text" className="form-control" value={country.name ? country.name : ""} id="exampleInputUsername1" name="name" placeholder="Country Name" onChange={changeData} />
                        <span style={{ color: 'red' }}>{validator.showMessageFor('name')}{validator.message('name', country.name, 'required|alpha')}</span>
                      </div>
                      <button type="submit" className="btn btn-primary mr-2" onClick={submitData}>Add Country</button>
                      <button className="btn btn-dark">Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Country List</h4>
                    <div class="table-responsive">
                    <DataTable columns={columns} data={countrylist} theme="solarized" pagination />
                      {/* <table class="table table-striped">

                        <tr>
                          <td>Id</td>
                          <td>Name</td>
                        </tr>
                        {countrylist && countrylist.map((val, i) => {
                          return (
                            <tr>
                              <td>{val.con_id}</td>
                              <td>{val.con_name}</td>
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

export default Country