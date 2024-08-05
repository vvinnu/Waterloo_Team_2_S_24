import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Script from "./Script/Script";
import { Chart } from "react-google-charts";

function Dash() {
  const [categorylist, setCategoryList] = useState([]);
  const [servicelist, setservicelist] = useState([]);
  const [productlist, setproductlist] = useState([]);
  const [bookinglist, setbookinglist] = useState([]);
  const [orderlist, setordrList] = useState([]);
  const [todayorderlist, settodayordrList] = useState([]);
  const [todayservice, settodayservice] = useState([]);
  const [orderchartdata,serOrderChartData]=useState([]);
  const [proorderchartdata,setproOrderChartData]=useState([]);
  const [contact,setContact]=useState([]);
  const [userlist, setUserList] = useState([]);
  const [bookingtotal,setbookingtotal] = useState();
  const [ordertotal,setordertotal] = useState();

  const getchartdata=()=>{
    const ndata = [
      ["Date", "Orders"]
    ];
    fetch('http://localhost:4001/getchartdata').then(res=>res.json()).then(data=>{
      console.log(data);
      JSON.parse(data.data).map((val)=>{
        ndata.push([val.b_date,val.torder]);
      });
      serOrderChartData(ndata);

    });
  }
  
  const getorderchartdata=()=>{
    
 
    const ndata = [
      ["Date", "Orders"]
    ];
    fetch('http://localhost:4001/getorderchartdata').then(res=>res.json()).then(data=>{
      console.log(data);
      JSON.parse(data.data).map((val)=>{
        ndata.push([val.o_date,val.torder]);
      });
      setproOrderChartData(ndata);

    });
  }

  const options = {
    title: "Booking ",
  };
 
  const options1 = {
    title: "Orders ",
  };
  const getcategory = () => {

    fetch('http://localhost:4001/getcategory')
      .then(response => response.json())
      .then(data => {
        console.log("CATEGORY");
        console.log(data);
        setCategoryList(data);
        console.log("CATEGORY");
        console.log(data.length);
      })
  }

  const getservice = () => {

    fetch('http://localhost:4001/getadminservice')
      .then(response => response.json())
      .then(data => {
        console.log("Service");
        console.log(data);
        setservicelist(data);
      })
  }

  const getproduct = () => {

    fetch('http://localhost:4001/getadminproduct')
      .then(response => response.json())
      .then(data => {
        console.log("Product");
        console.log(data);
        setproductlist(data);
      })
  }

  const getbooking = () => {

    fetch('http://localhost:4001/getbooking')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setbookinglist(data);
      })
  }
  const getuser = () => {

    fetch('http://localhost:4001/orderdetail')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setordrList(data);
      })
  }

  const gettodayorder = () => {

    fetch('http://localhost:4001/todayorderdetail')
      .then(response => response.json())
      .then(data => {
        console.log("today order");
        console.log(data);
        settodayordrList(data);
      })
  }

  const gettodayservice = () => {

    fetch('http://localhost:4001/todayproductdetail')
      .then(response => response.json())
      .then(data => {
        console.log("today order");
        console.log(data);
        settodayservice(data);
      })
  }


  const getmeassage = () => {

    fetch('http://localhost:4001/getcontact')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setContact(data);
      })
  }

  const getreg = () => {

    fetch('http://localhost:4001/getreg')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUserList(data);
      })
  }

  const bookingtotalamount = () => {

    fetch('http://localhost:4001/getbookingtotal')
      .then(response => response.json())
      .then(data => {
        console.log(data[0].total);
        setbookingtotal(data[0].total);
      })
  }

  
  const ordertotalamount = () => {

    fetch('http://localhost:4001/getordertotal')
      .then(response => response.json())
      .then(data => {
        console.log("dsfd df");
        console.log(data[0].stotal);
        setordertotal(data[0].stotal);
      })
  }

  useEffect(() => {
    getcategory();
    getservice();
    getproduct();
    getbooking();
    getuser();
    gettodayorder();
    gettodayservice();
    getchartdata();
    getorderchartdata();
    bookingtotalamount();
  getmeassage ();
  getreg();
ordertotalamount();
    
  }, []);
  return <>
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
          </div>
        </div>
        <div className="row">
         
         <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
           <div className="card">
             <div className="card-body" style={{ height: '159px' }}>
               <div className="row">
                 <div className="col-9">
                   <div className="d-flex align-items-center align-self-start">
                     <h3 className="mb-0" style={{ fontSize: '32px' }}>No Of Category</h3>
                   </div>
                 </div>
                 <div className="col-3">
                   <Link to='/category'>
                     <div className="icon icon-box-success ">
                       <span className="mdi mdi-arrow-top-right icon-item"></span>
                     </div>
                   </Link>
                 </div>
               </div>
               <span className="menu-icon">
                 <i className="fa fa-list-alt" style={{fontSize: '38px',marginLeft: '162px',marginTop: '-2px', color: 'grey' }}></i>
               </span>
               <h5 className="text-muted font-weight-normal" style={{ fontSize: '39px',marginTop: '-38px'}}>{categorylist.length}</h5>
             </div>
           </div>
         </div>
         <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
           <div className="card">
             <div className="card-body" style={{ height: '159px' }}>
               <div className="row">
                 <div className="col-9">
                   <div className="d-flex align-items-center align-self-start">

                     <h3 className="mb-0" style={{ fontSize: '32px' }}>No Of Services</h3>
                   </div>
                 </div>
                 <div className="col-3">
                   <Link to='/Services'>
                     <div className="icon icon-box-success">
                       <span className="mdi mdi-arrow-top-right icon-item"></span>
                     </div>
                   </Link>
                 </div>

               </div>
               <span className="menu-icon">
                 <i className="fa fa-wrench" style={{fontSize: '38px',marginLeft: '162px',marginTop: '-2px', color: 'grey' }}></i>
               </span>
               <h6 className="text-muted font-weight-normal" style={{ fontSize: '39px',marginTop: '-38px'}}>{servicelist.length}</h6>
             </div>
           </div>
         </div>
        
         <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
           <div className="card">
             <div className="card-body" style={{ height: '159px' }}>
               <div className="row">
                 <div className="col-9">

                   <div className="d-flex align-items-center align-self-start">
                     <h3 className="mb-0" style={{ fontSize: '32px' }}>No Of Products</h3>
                   </div>
                 </div>
                 <div className="col-3">
                   <Link to='/Product'>   <div className="icon icon-box-success">
                     <span className="mdi mdi-arrow-top-right icon-item"></span>
                   </div></Link>
                 </div>
               </div>
               <span className="menu-icon">
                 <i className="fa fa-shopping-cart" style={{fontSize: '38px',marginLeft: '162px',marginTop: '-2px', color: 'grey' }}></i>
               </span>
               <h6 className="text-muted font-weight-normal" style={{ fontSize: '39px',marginTop: '-38px'}}>{productlist.length}</h6>
             </div>
           </div>
         </div>
         <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
           <div className="card">
             <div className="card-body" style={{ height: '159px' }}>
               <div className="row">
                 <div className="col-9">
                   <div className="d-flex align-items-center align-self-start">
                     <h3 className="mb-0" style={{ fontSize: '32px' }}>No Of Order</h3>
                   </div>
                 </div>
            <div className="col-3">
                   <Link to='/orderdetail'>
                     <div className="icon icon-box-success ">
                       <span className="mdi mdi-arrow-top-right icon-item"></span>
                     </div>
                   </Link>
                 </div>
               </div>
               <span className="menu-icon">
                 <i className="fa fa-line-chart" style={{fontSize: '38px',marginLeft: '162px',marginTop: '-2px', color: 'grey' }}></i>
               </span>
               <h5 className="text-muted font-weight-normal" style={{ fontSize: '39px',marginTop: '-38px'}}>{orderlist.length}</h5>
             </div>
           </div>
         </div>
         <div className="col-xl-3 col-sm-12 grid-margin stretch-card">
           <div className="card">
             <div className="card-body" style={{ height: '159px' }}>
               <div className="row">
                 <div className="col-9">
                   <div className="d-flex align-items-center align-self-start">
                     <h3 className="mb-0" style={{ fontSize: '32px' }}>No Of Booking</h3>
                   </div>
                 </div>
                 <div className="col-3">
                   <Link to='/Booking'>   <div className="icon icon-box-success">
                     <span className="mdi mdi-arrow-top-right icon-item"></span>
                   </div></Link>
                 </div>
               </div>
               <span className="menu-icon">
                 <i className="fa fa-shopping-bag" style={{fontSize: '38px',marginLeft: '162px',marginTop: '-2px', color: 'grey' }}></i>
               </span>
               <h6 className="text-muted font-weight-normal"style={{ fontSize: '39px',marginTop: '-38px'}}>{bookinglist.length}</h6>
             </div>
           </div>
         </div>
         <div className="col-xl-3 col-sm-12 grid-margin stretch-card">
           <div className="card">
             <div className="card-body" style={{ height: '159px' }}>
               <div className="row">
                 <div className="col-9">
                   <div className="d-flex align-items-center align-self-start">
                     <h3 className="mb-0" style={{ fontSize: '32px' }}>No Of Messages</h3>
                   </div>
                 </div>
                 <div className="col-3">
                   <Link to='/Contactdata'>   <div className="icon icon-box-success">
                     <span className="mdi mdi-arrow-top-right icon-item"></span>
                   </div></Link>
                 </div>
               </div>
               <span className="menu-icon">
                 <i className="fa fa-envelope" style={{fontSize: '38px',marginLeft: '162px',marginTop: '-2px', color: 'grey' }}></i>
               </span>
               <h6 className="text-muted font-weight-normal" style={{ fontSize: '38px', marginTop: '-48px' }}>{contact.length}</h6>
             </div>
           </div>
         </div>
        
         <div className="col-xl-3 col-sm-12 grid-margin stretch-card">
           <div className="card">
             <div className="card-body" style={{ height: '159px' }}>
               <div className="row">
                 <div className="col-9">
                   <div className="d-flex align-items-center align-self-start">
                     <h3 className="mb-0" style={{ fontSize: '32px' }}>No Of Users</h3>
                   </div>
                 </div>
                 <div className="col-3">
                   <Link to='/Userdata'>   <div className="icon icon-box-success">
                     <span className="mdi mdi-arrow-top-right icon-item"></span>
                   </div></Link>
                 </div>
               </div>
               <span className="menu-icon">
                 <i className="fa fa-user" style={{fontSize: '45px',marginLeft: '162px',marginTop: '-2px', color: 'grey' }}></i>
               </span>
               <h6 className="text-muted font-weight-normal" style={{ fontSize: '39px',marginTop: '-38px'}}>{userlist.length}</h6>
             </div>
           </div>
         </div>
        
       </div>
        <div className="row ">
          <div className="col-md-6">
            <Chart
              chartType="PieChart"
              width="100%"
              height="380px"
              data={orderchartdata}
              options={options}
            />

          </div>
          <div className="col-md-6">
            <Chart
              chartType="PieChart"
              width="100%"
              height="380px"
              data={proorderchartdata}
              options={options1}
            />
          <br/>
          </div>       
        </div>
        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Today's order</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> First Name </th>
                        <th> Order Date </th>
                        <th> Coupon Code </th>
                        <th> Discount  </th>
                        <th> Total amount </th>
                        <th> Invoice </th>
                      </tr>
                    </thead>
                    <tbody>
                      {todayorderlist && todayorderlist.map((val) => {
                        return (<>
                          <tr>

                            <td> {val.firstname} </td>
                            <td> {val.o_date}</td>
                            <td>{val.c_code} </td>
                            <td> {val.c_d_amount} </td>
                            <td> {val.o_amount} </td>
                            <td><a href={`/orderinvoice/${val.o_id}`} className="fa fa-files-o " style={{ fontSize: '30px', cursor: 'pointer', color: 'white', marginLeft: '20px',marginTop:'-13px',position:'absolute'}}></a></td>
                          </tr>
                        </>)
                      })}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Today's Booking</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> First Name </th>
                        <th> Booking Date </th>
                        <th> Coupon Code </th>
                        <th> Discount  </th>
                        <th> Total amount </th>
                        <th> Invoice </th>
                      </tr>
                    </thead>
                    <tbody>
                      {todayservice && todayservice.map((val) => {
                        return (<>
                          <tr>

                            <td> {val.firstname} </td>
                            <td> {val.b_date}</td>
                            <td>{val.c_code} </td>
                            <td> {val.c_d_amount} </td>
                            <td> {val.b_amount} </td>
                            <td><a href={`/bookinginvoice/${val.b_id}`} className="fa fa-files-o  " style={{ fontSize: '30px', cursor: 'pointer', color: 'white', marginLeft: '20px',marginTop:'-13px',position:'absolute' }}></a></td>
                          </tr>
                        </>)
                      })}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

            <div className="row">
              <div className="col-sm-4 grid-margin">
                <div className="card" style={{height:'183px'}}>
                  <div className="card-body">
                    <h5 style={{marginBottom: '29px'}}>Booking Total</h5>
                    <div className="row">
                      <div className="col-8 col-sm-12 col-xl-8 my-auto">
                        <div className="d-flex d-sm-block d-md-flex align-items-center">
                          
                          <h2 className="mb-0"><i class='fa fa-rupee' style={{ fontSize: '30px'}}></i>{bookingtotal}</h2>
                          {/* <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p> */}
                        </div>
                        {/* <h6 className="text-muted font-weight-normal">11.38% Since last month</h6> */}
                      </div>
                      <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                        <i className="fa fa-list-alt text-primary ml-auto" style={{fontSize: '58px'}}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 grid-margin">
                <div className="card" style={{height:'183px'}}>
                  <div className="card-body">
                    <h5 style={{marginBottom: '29px'}}>Order Total</h5>
                    <div className="row">
                      <div className="col-8 col-sm-12 col-xl-8 my-auto">
                        <div className="d-flex d-sm-block d-md-flex align-items-center">
                          <h2 className="mb-0"><i class='fa fa-rupee' style={{ fontSize: '30px'}}></i>{ordertotal}</h2>
                          {/* <p className="text-success ml-2 mb-0 font-weight-medium">+8.3%</p> */}
                        </div>
                        {/* <h6 className="text-muted font-weight-normal"> 9.61% Since last month</h6> */}
                      </div>
                      <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                        <i className="fa fa-shopping-cart text-danger ml-auto" style={{fontSize: '58px'}}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 grid-margin">
              <div className="card" style={{height:'183px'}}>
                  <div className="card-body">
                    <h5 style={{marginBottom: '18px'}}>Total Amount</h5>
                    <div className="row">
                      <div className="col-8 col-sm-12 col-xl-8 my-auto">
                        <div className="d-flex d-sm-block d-md-flex align-items-center" >
                          <h2 className="mb-0"><i class='fa fa-rupee' style={{ fontSize: '30px'}}></i>{bookingtotal+ordertotal}</h2>
                          {/* <p className="text-danger ml-2 mb-0 font-weight-medium">-2.1% </p> */}
                        </div>
                        {/* <h6 className="text-muted font-weight-normal">2.27% Since last month</h6> */}
                      </div>
                      <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                        <i className="fa fa-calculator text-success ml-auto" style={{fontSize: '58px'}}></i>
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

export default Dash