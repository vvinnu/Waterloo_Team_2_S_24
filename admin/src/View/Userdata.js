import React, { useEffect, useState } from "react";
import Script from "./Script/Script";
import DataTable from 'react-data-table-component';

function Userdata() {
  const [userlist, setUserList] = useState([]);

  const getuser = () => {

    fetch('http://localhost:5050/getreg')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUserList(data);
      })
  }
  const columns = [
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    // {
    //   name: 'Passwor',
    //   selector: row=><img width="50px" src={`http://127.0.0.1:5050/images/${row.img ? row.img : '123.jpg'}`} alt="images" />,
    //   sortable: true,
    // },
    {
      name: 'Password',
      selector: row => row.password,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: row => row.firstname,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: row => row.lastname,
      sortable: true,
    },
    {
      name: 'Mobile',
      selector: row => row.mobileno,
      sortable: true,
    },
    {
      name: 'Usename',
      selector: row => row.newuser,
      sortable: true,
    },
  ];

  useEffect(() => {
    getuser();
  }, []);

  return <>

    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
          <div class="content-wrapper" id="usedata">
            <div class="page-header">
              <h3 class="page-title"> User Data </h3>
              <nav aria-label="breadcrumb">
              </nav>
            </div>
            <div class="row">
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">User Table</h4>
                    <div class="table-responsive">
                    <DataTable columns={columns} data={userlist} theme="solarized" pagination />
                      {/* <table class="table table-striped">

                        <tr>
                          <th> Email </th>
                          <th> Password </th>
                          <th> Repassword </th>
                          <th> Mobile No </th>
                          <th> First Name </th>
                          <th> Last Name</th>
                          <th> Gender </th>
                        </tr>

                        {userlist && userlist.map((val, i) => {
                          return (<tr>
                            <td>{val.email}</td>
                            <td>{val.password}</td>
                            <td>{val.repassword}</td>
                            <td>{val.mobileno}</td>
                            <td>{val.firstname}</td>
                            <td>{val.lastname}</td>
                            <td>{val.gender == 0 ? 'male' : 'female'}</td>
                          </tr>);
                        })
                        }
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

export default Userdata