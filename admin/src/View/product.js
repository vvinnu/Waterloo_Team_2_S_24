import React, { useEffect, useState } from "react";
import Script from "./Script/Script";
import SimpleReactValidator from 'simple-react-validator';
import DataTable from 'react-data-table-component';
import Notification from './Notification/customisenoti';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState,convertToRaw} from 'draft-js';
import drafttohtml from 'draftjs-to-html';

function Product() {
  const [productlist, setproductList] = useState([]);
  const [response, setResponse] = useState(0);
  const [editorstate,setEditorstate]=useState(EditorState.createEmpty());
  const [submit, setsubmit] = useState(0);
  const getproduct = () => {

    fetch('http://localhost:4001/getproductdata')
  
      .then(response => response.json())
      .then(data => {
        console.log("PRODUCT");
        console.log(data);
        setproductList(data);
      })
  }
  const [product, setproduct] = useState({});
  const [error, setError] = useState({});
  const changeData = (event) => {
    //console.log(event.target.name);
    //console.log(event.target.value);
    setproduct({
      ...product,

      [event.target.name]: event.target.value,
    });

  }
  const onEditorStateChange=(neweditor)=>{
    setEditorstate(neweditor);
    console.log(neweditor);
    let html=drafttohtml(convertToRaw(neweditor.getCurrentContent()));
    console.log(html);
    setproduct({
      ...product,

      desc : html,
    });


}
  const updateFile = (e) => {
    //  console.log("File");
    //   console.log(e.target.files);
    setproduct({
      ...product,
      file: e.target.files[0],
    });
  }
  const validator = new SimpleReactValidator();
  const deleteData = (id) => {
    // e.preventDefault();
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ pid: id }),
      headers: { "Content-Type": "application/json" }
    };
    console.log(product);
    fetch('http://localhost:4001/delproduct', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status == 'Sucsess') {
          setResponse((response)=> response+1);
          Notification({ message: data.message, position: 'right', type: 'success' });
          setproduct({});
        }
        else {
          Notification({ message: data.message, position: 'right', type: 'error' });
        }
      })
  }
  const submitData = (e) => {
    e.preventDefault();

    let data = new FormData();
    console.log("Product");
    console.log(product);

     data.append('name', product.name);
     data.append('price',product.price);
     data.append('files',product.file);
     data.append('desc',product.desc);
     data.append('qty',product.qty);
     console.log("formdata");
     console.log(data);
    let option = {
      method: 'POST',
      body: data
    }
    console.log("option");
    console.log(option);
    fetch('http://localhost:4001/product', option)
      .then(response => response.json())
      .then(data => {
        setsubmit((submit)=>submit+1);
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

  const columns = [
    {
      name: 'Product ID',
      selector: row => row.p_id,
      sortable: true,
    },
    {
      name: 'Product Name',
      selector: row => row.p_name,
      sortable: true,
    },
    {
      name: 'Product Price',
      selector: row => row.p_price,
      sortable: true,
    },
    {
      name: 'Image',
      selector: row=><img width="50px" src={`http://127.0.0.1:4001/images/${row.p_image ? row.p_image : '123.jpg'}`} alt="images" />,
      sortable: true,
    },
    {
        name: 'Description',
        selector: row => row.p_desc,
        sortable: true,
        width:"150px",
      },
      {
        name: 'Quantity',
        selector: row => row.qty,
        sortable: true,
      },
    {
      name: 'Action',
      selector: row => <><a href={`/editproduct/${row.p_id}`} className="fa fa-edit " style={{ fontSize: '30px', cursor: 'pointer' , color:'black'}}></a> <i className="fa fa-trash-o" onClick={() => deleteData(row.p_id)} style={{ fontSize: '30px', cursor: 'pointer' , marginLeft:'20px'}}></i></>,
      sortable: true,
    },
  ];

  useEffect(() => {
    getproduct();
    setproduct({});
  }, [response, submit]);
  return <>
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <div className="main-panel">
          <div className="content-wrapper" id="newform">
            <div className="page-header">
              <h3 className="page-title"> Product </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  {/* <li className="breadcrumb-item"><a href="#">Forms</a></li> */}
                  <li className="breadcrumb-item active" aria-current="page"> Product </li>
                </ol>
              </nav>
            </div>
            <div className="row">
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Product form</h4>
                    {/* <p className="card-description"> Basic form layout </p> */}
                    <form className="forms-sample">
                      <div className="form-group">
                        <label htmlFor="exampleInputUsername1">Product Name</label>
                        <input type="text" className="form-control" value={product.name ? product.name : ""} id="exampleInputUsername1" name="name" placeholder="Product Name" onChange={changeData} />
                        <span style={{color:'red'}}>{validator.showMessageFor('name')}{validator.message('name', product.name, 'required')}</span>   
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputUsername1">Product Price</label>
                        <input type="text" className="form-control" value={product.price ? product.price : ""} id="exampleInputUsername1" name="price" placeholder="Product Price" onChange={changeData} />
                        <span style={{color:'red'}}>{validator.showMessageFor('price')}{validator.message('price', product.price, 'required')}</span>   
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleimage">Image</label>
                        <input type="file" name="files" className="form-control" onChange={updateFile} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleTextarea1">Discription</label>
                        <Editor editorState={editorstate}  onEditorStateChange={onEditorStateChange}/>
                        {/* <textarea className="form-control" id="exampleTextarea1" rows="4" name="desc" value={service.desc ? service.desc : ""} placeholder="Say About Your Services" onChange={changeData}></textarea> */}
                        {/* <span style={{color:'red'}}>{validator.showMessageFor('desc')}{validator.message('desc', product.desc, 'required|alpha)}</span>    */}
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputUsername1">Product Quantity</label>
                        <input type="text" className="form-control" value={product.qty ? product.qty : ""} id="exampleInputUsername1" name="qty" placeholder="Product Quantity" onChange={changeData} />
                        <span style={{color:'red'}}>{validator.showMessageFor('qty')}{validator.message('qty', product.price, 'required')}</span>   
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
                      <h4 className="card-title">Product List</h4>
                      <div className="table-responsive">
                        <DataTable columns={columns} data={productlist} theme="solarized" pagination />
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

export default Product