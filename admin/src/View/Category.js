import React, { useEffect, useState } from "react";
import Script from "./Script/Script";
import SimpleReactValidator from 'simple-react-validator';
import DataTable from 'react-data-table-component';
import Notification from './Notification/customisenoti';
function Category() {
  const [categorylist, setCategoryList] = useState([]);
  const [response, setResponse] = useState(0);
  const [submit, setsubmit] = useState(0);
  const getcategory = () => {

    fetch('http://localhost:4001/getcategory')
      .then(response => response.json())
      .then(data => {
        console.log("CATEGORY");
        console.log(data);
        setCategoryList(data);
      })
  }
  const [cate, setcate] = useState({});
  const [error, setError] = useState({});
  const changeData = (event) => {
    //console.log(event.target.name);
    //console.log(event.target.value);
    setcate({
      ...cate,

      [event.target.name]: event.target.value,
    });

  }
  const updateFile = (e) => {
    //  console.log("File");
    //   console.log(e.target.files);
    setcate({
      ...cate,
      file: e.target.files[0],
    });
  }
  const validator = new SimpleReactValidator();
  const deleteData = (id) => {
    // e.preventDefault();
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ cid: id }),
      headers: { "Content-Type": "application/json" }
    };
    console.log(cate);
    fetch('http://localhost:4001/delcategory', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status == 'Sucsess') {
          setResponse((response)=> response+1);
          Notification({ message: data.message, position: 'right', type: 'success' });
        
        }
        else {
          Notification({ message: data.message, position: 'right', type: 'error' });
        }
      })
  }
  const submitData = (e) => {
    e.preventDefault();

    let data = new FormData();
    console.log("category");
    console.log(cate);

     data.append('name', cate.name);
     data.append('files',cate.file);
     console.log("formdata");
     console.log(data);
    let option = {
      method: 'POST',
      body: data
    }
    console.log("option");
    console.log(option);
    fetch('http://localhost:4001/category', option)
      .then(response => response.json())
      .then(data => {
        console.log(data.id);
        if (data.status == 'Success') {
          setsubmit((submit)=>submit+1);
          Notification({ message: data.message, position: 'right', type: 'success' });
          setcate({});
        }
        else {
          Notification({ message: data.message, position: 'right', type: 'error' });
        }
      });
  }


  const columns = [
    {
      name: 'Category ID',
      selector: row => row.c_id,
      sortable: true,
    },
    {
      name: 'Category Name',
      selector: row => row.c_name,
      sortable: true,
    },
    {
      name: 'Image',
      selector: row=><img width="50px" src={`http://127.0.0.1:4001/images/${row.c_img ? row.c_img : '123.jpg'}`} alt="images" />,
      sortable: true,
    },
    {
      name: 'Action',
      selector: row => <><a href={`/editcategory/${row.c_id}`} className="fa fa-edit " style={{ fontSize: '30px', cursor: 'pointer' , color:'black'}}></a> <i className="fa fa-trash-o" onClick={() => deleteData(row.c_id)} style={{ fontSize: '30px', cursor: 'pointer' , marginLeft:'20px'}}></i></>,
      sortable: true,
    },
  ];

  useEffect(() => {
    getcategory();
    setcate({});
  }, [response, submit]);
  return <>
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper" id="newform">
            <div className="page-header">
              <h3 className="page-title"> Category </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  {/* <li className="breadcrumb-item"><a href="#">Forms</a></li> */}
                  <li className="breadcrumb-item active" aria-current="page">Category </li>
                </ol>
              </nav>
            </div>
            <div className="row">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Category form</h4>
                    {/* <p className="card-description"> Basic form layout </p> */}
                    <form className="forms-sample">
                      <div className="form-group">
                        <label htmlFor="exampleInputUsername1">Category Name</label>
                        <input type="text" className="form-control" value={cate.name ? cate.name : ""} id="exampleInputUsername1" name="name" placeholder="Category Name" onChange={changeData} />
                        <span style={{ color: 'red' }}>{validator.showMessageFor('name')}{validator.message('name', cate.name, 'required')}</span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleimage">Image</label>
                        <input type="file" name="files" className="form-control" onChange={updateFile} />
                      </div>
                      <button type="submit" className="btn btn-primary mr-2" onClick={submitData}>Add</button>
                      <button className="btn btn-dark">Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
             
                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Category List</h4>
                      <div className="table-responsive">
                        <DataTable columns={columns} data={categorylist} theme="solarized" pagination />
                        {/* <table className="table table-striped">
                 
                  <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>delete</td>
                  </tr> 
                   {categorylist && categorylist.map((val,i)=>{
                      return (
                      <tr>
                        <td>{val.c_id}</td>
                      <td>{val.c_name}</td>
                      
                      <td><span><i className="fa fa-trash-o" onClick={()=>deleteData(val.c_id)} style={{fontSize:'30px',cursor:'pointer'}}></i></span></td>
                     
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

export default Category