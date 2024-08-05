import React, { useEffect, useState } from "react";
import Script from "./Script/Script";
import SimpleReactValidator from 'simple-react-validator';
import Notification from './Notification/customisenoti';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState,convertToRaw} from 'draft-js';
import drafttohtml from 'draftjs-to-html';

function Services() {
  const [categorylist, setCategoryList] = useState([]);
  const [res, setRes] = useState(0);
  const [fileData, setfileData] = useState();
  const [editorstate,setEditorstate]=useState(EditorState.createEmpty());
  const [response, setResponse] = useState(0);
  const [submit, setsubmit] = useState(0);
  const [status, setStatus] = useState(0);

  const [citylist, setCityList] = useState([]);
  const [attributelist, setattributelist] = useState([]);
  const getcity = () => {

    fetch('http://localhost:4001/getCity')
      .then(response => response.json())  
      .then(data => {
        console.log("City");
        console.log(data);
        setCityList(data);
      })
  }
  const navigate = useNavigate();
  const attribute = (event) => {
    console.log(event);
    setattributelist([
      ...attributelist, {
        value: '',
      }]);
      console.log(attributelist);
  }
  const getcategory = () => {

    fetch('http://localhost:4001/getcategory')
      .then(response => response.json())
      .then(data => {
         console.log("CATEGORY");
         console.log(data);
        setCategoryList(data);
      })
  }

  const onEditorStateChange=(neweditor)=>{
      setEditorstate(neweditor);
      console.log(neweditor);
      let html=drafttohtml(convertToRaw(neweditor.getCurrentContent()));
      console.log(html);
      setService({
        ...service,
  
        desc : html,
  
      });
  

  }

  const [servicelist, setservicelist] = useState([]);
  // const [response,setResponse] = useState(0);
  const getservice = () => {

    fetch('http://localhost:4001/getservicenotlogin')
      .then(response => response.json())
      .then(data => {
        console.log("Service");
        console.log(data);
        // Map category names to services
        const updatedServiceList = data.map(service => {
        const category = categorylist.find(cat => cat.c_id === service.category_id);
        return { ...service, category: category ? category.c_name : 'Unknown' };
      });
      setservicelist(updatedServiceList);

        //setservicelist(data);
      })
  }

  const [service, setService] = useState({});
  const [error, setError] = useState({});
  const changeData = (event) => {
    //console.log(event.target.name);
    //console.log(event.target.value);
    setService({
      ...service,

      [event.target.name]: event.target.value,

    });

  }
  const updateFile = (e) => {
    //  console.log("File");
    //   console.log(e.target.files);
    setfileData(e.target.files);
    // setService({
    //   ...service,
    //       file: e.target.files[0]
    // });
  }
  const validator = new SimpleReactValidator();
  console.log(service);
  const submitData = (e) => {
    console.log(attributelist);
    e.preventDefault();
   
    let formdata = new FormData();
    console.log("service");
    console.log(service);

    formdata.append("cid", service.cid);
    formdata.append("name", service.name);
    formdata.append("price", service.price);
    formdata.append("desc",service.desc);
    console.log("fileData");
    console.log(formdata);
    
    Object.keys(fileData);
    for (const key of Object.keys(fileData)) {
      formdata.append("files", fileData[key]);
    }
    console.log(fileData);
    console.log("attributelist");
    console.log(attributelist);
    for (const key of Object.keys(attributelist)) {
      console.log(attributelist[key].value)
      formdata.append('city', attributelist[key].value);
    }
   
    
    let option = {
      method: 'POST',
      body: formdata
    }
    console.log(option);
    fetch('http://localhost:4001/services', option)

      .then(response => response.json())
      .then(data => {
        console.log("table");
      
        console.log(data);
        if (data.status == 'Success') {
          setsubmit((submit) => submit + 1);
          Notification({ message: data.message, position: 'right', type: 'success' });
          setService({});
          setattributelist([]);
         
        }
        else {
          
          Notification({ message: data.message, position: 'right', type: 'error' });
        }
      
      });
  }
  const deleteData = (id) => {
    // e.preventDefault();
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ sid: id }),
      headers: { "Content-Type": "application/json" }
    };
    console.log(service);
    fetch('http://localhost:4001/delservice', requestOptions)
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

  const servicestatus = (id) => {
    // e.preventDefault();
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ sid: id }),
      headers: { "Content-Type": "application/json" }
    };
    console.log(service);
    fetch('http://localhost:4001/servicestatus', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if (data.status == 'success') {
          setStatus((status) => status + 1);
          Notification({ message: data.message, position: 'right', type: 'success' });
        }
        else {
        
          Notification({ message: data.message, position: 'right', type: 'error' });
        }

      })
  }




  const columns = [
    {
      name: 'Category Name',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Service Title',
      selector: row => row.s_name,
      sortable: true,
    },
    {
      name: 'Image',
      selector: row => <img width="50px" src={`http://127.0.0.1:4001/images/${row.img ? row.img : ''}`} alt="images" />,
      sortable: true,
      width:"100px",
    },
    {
      name: 'Price',
      selector: row => row.s_price,
      sortable: true,
      width:"80px",
    },
    {
      name: 'Description',
      selector: row => row.s_decs,
      sortable: true,
      width:"150px",
    },
    {
      name: 'Action',
      selector: row => <><a href={`/editservices/${row.s_id}`} className="fa fa-edit " style={{ fontSize: '30px', cursor: 'pointer' , color:'black'}}></a> <i class="fa fa-trash-o" onClick={() => deleteData(row.s_id)} style={{ fontSize: '30px', cursor: 'pointer', marginLeft:'20px'}}></i><a href={`/Viewservices/${row.s_id}`} className="fa fa-eye " style={{ fontSize: '30px', cursor: 'pointer' , color:'black', marginLeft:'20px'}}></a></>,
      sortable: true,
    },
    {
      name:'Status',
      selector:row => row.status==1?<i class="fa fa-times" onClick={() => servicestatus(row.s_id)} style={{ fontSize: '30px', cursor: 'pointer', marginLeft:'20px'}}></i> :<i class="fa fa-check" onClick={() => servicestatus(row.s_id)} style={{ fontSize: '30px', cursor: 'pointer', marginLeft:'20px'}}></i>,
      sortable:true,
      width:"100px",
    }
  ];

  useEffect(() => {
    getcategory();
    getservice();
    getcity();
    setService({});
    setattributelist([]);
  }, [response, submit ,status]);


  return <>

    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper" id="service">
            <div className="page-header">
              <h3 className="page-title"> Services </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  {/* <li className="breadcrumb-item"><a href="#">Forms</a></li> */}
                  <li className="breadcrumb-item active" aria-current="page">Services </li>
                </ol>
              </nav>
            </div>
            <div className="row">
              <div className="col-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Services Detail</h4>
                    {/* <p className="card-description"> Basic form elements </p> */}
                    <form className="forms-sample" style={{ width: '100%' }}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-12 col-form-label">Category</label>
                            <div className="col-sm-12">
                              <select className="form-control" name="cid" value={service.cid ? service.cid : ""} onChange={changeData}>
                                <option>Select Category</option>
                                {categorylist && categorylist.map((val, i) => {
                                  return (<option value={val.c_id}>{val.c_name}</option>)
                                })}
                              </select>
                              <span style={{ color: 'red' }}>{validator.showMessageFor('cid')}{validator.message('cid', service.cid, 'required')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputName1">Name</label>
                        <input type="text" className="form-control" id="exampleInputName1" name="name" value={service.name ? service.name : ""} placeholder="Services Name" onChange={changeData} />
                        <span style={{ color: 'red' }}>{validator.showMessageFor('name')}{validator.message('name', service.name, 'required|string')}</span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail3">Price</label>
                        <input type="Text" className="form-control" id="exampleInputEmail3" name="price" value={service.price ? service.price : ""} placeholder="Services Price" onChange={changeData} />
                        <span style={{ color: 'red' }}>{validator.showMessageFor('price')}{validator.message('price', service.price, 'required|numeric')}</span>
                      </div>

                      <div className="form-group">
                        <label>Image</label>
                        {/* <input type="file" name="img" className="file-upload-default" onChange={updateFile} />
                        <div className="input-group col-xs-12">
                          <input type="text" className="form-control file-upload-info" disabled placeholder="Upload Image" />
                          <span className="input-group-append">
                            <button className="file-upload-browse btn btn-primary" type="button"  >Upload</button> */}
                        {/* </span> */}
                        <input type="file" name="img" className="form-control" onChange={updateFile} multiple />
                        {/* </div> */}
                      </div>
                     
                      <div className="form-group">
                        <label htmlFor="exampleInputCity1">City</label>
                        <button className="btn btn-primary mr-2" style={{marginLeft:'10px'}} type="button" onClick={attribute} >Add</button><br />
                        <div className="col-sm-12">

                           {attributelist && attributelist.map((val, inx) => {
                            
                            return (

                              <select defaultValue={val.id} style={{marginTop:'10px'}} className="form-control" name="cid" onChange={(e) => {
                                let newattribute = attributelist;
                                newattribute[inx].value = e.target.value;
                              
                                setattributelist(newattribute);
                              }}>
                             
                                {citylist && citylist.map((val, i) => {
                                  return (<option value={val.city_id}>{val.city_name}</option>)
                                })}
                              </select>
                            )
                          })}

                        </div>
                        {/* <span style={{ color: 'red' }}>{validator.showMessageFor('cid')}{validator.message('cid', service.cid, 'required')}</span> */}

                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleTextarea1">Discription</label>
                        <Editor editorState={editorstate}  onEditorStateChange={onEditorStateChange}/>
                        {/* <textarea className="form-control" id="exampleTextarea1" rows="4" name="desc" value={service.desc ? service.desc : ""} placeholder="Say About Your Services" onChange={changeData}></textarea> */}
                        {/* <span style={{ color: 'red' }}>{validator.showMessageFor('desc')}{validator.message('desc', service.service, 'required|alpha|numeric')}</span> */}
                      </div>
                      <button type="submit" className="btn btn-primary mr-2"  onClick={submitData}>Add</button>
                      <button className="btn btn-dark">Cancel</button>
                    </form>
                  </div>
                </div>
              </div>

              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Service List</h4>
                    <div class="table-responsive">
                      <DataTable columns={columns} data={servicelist} theme="solarized" pagination />
                     
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div >
    <Script />
  </>
}

export default Services