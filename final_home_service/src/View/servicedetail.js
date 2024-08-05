
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Script from './Script/script.js';
import ReactStars from 'react-rating-stars-component';
import SimpleReactValidator from 'simple-react-validator';
import Parser from 'html-react-parser';
import Notification from './Notification/customisenoti';
import { useNavigate } from 'react-router-dom';

function Servicedetail() {
  let { id } = useParams();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Format the date to YYYY-MM-DD
  const formattedDate = tomorrow.toISOString().substr(0, 10);

  const [reviewstore, setreviewstore] = useState({
    rate: 0,
    review: '',
  });

  let userdata = JSON.parse(localStorage.getItem('user'));
  console.log("USER profile DATA");
  console.log(userdata);

  const [selectedimage, setselectedimage] = useState('');
  const navigate = useNavigate();
  const validator = new SimpleReactValidator();

  const [servicedetail, setservicedetail] = useState([]);
  const [serviceorder, setserviceorder] = useState([]);
  const [servicereview, setservicereview] = useState([]);
  const [serviceform, setServiceForm] = useState({
    id: id,
    image: '',
    qty: 1,
    bdate: '',
    btime: '',
    name: '',
    price: 0,
    address: '',
  });

  const setservicedata = (e) => {
    setServiceForm({
      ...serviceform,

      [e.target.name]: e.target.value,
    });
  }

  const getrate = (rate) => {
    setreviewstore({
      ...reviewstore,
      rate: rate,
    });
  }
  const submitreview = () => {
    console.log(reviewstore);
    let formdate = {
      rate: reviewstore.rate,
      reviews: reviewstore.review,
      s_id: id,
      u_id: JSON.parse(localStorage.getItem('user')).u_id,
    };
    console.log(formdate);

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(formdate),
      headers: { "Content-Type": "application/json" }
    };
    fetch('http://localhost:3001/servicerating', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data.id);
        if (data.status == 'Sucsess') {
          Notification({ message: data.message, position: 'right', type: 'success' });
        }
        else {
          Notification({ message: data.message, position: 'right', type: 'error' });
        }
      });

  }

  const addtocart = (e) => {
    e.preventDefault();
    if (validator.allValid()) {

      if (JSON.parse(localStorage.getItem('user') != null)) {

        console.log(serviceform);

        let mycart = JSON.parse(localStorage.getItem('cart'));
        console.log("dfvsv");
        console.log(localStorage.getItem('cart'))
        console.log("MCART = " + mycart);
        // let mycart = [];
        if (mycart != null) {

          let find = '';
          Object.keys(mycart).map((key) => {
            if (mycart[key].id == serviceform.id) {
              find = key;
            }
          })

          if (find != '') {
            mycart[find].qty = parseInt(mycart[find].qty) + parseInt(serviceform.qty);
          }
          else {
            mycart.push(serviceform);
          }
          localStorage.setItem('cart', JSON.stringify(mycart));
        }
        else {
          localStorage.setItem('cart', "[" + JSON.stringify(serviceform) + "]");
        }
        Notification({ message: "Add_to_cart", position: 'right', type: 'success' });
        navigate('/cartdata');
      }
      else {
        Notification({ message: 'Please_Login_First', position: 'right', type: 'error' });
        navigate('/login');
      }
    }
    else {
      Notification({ message: "Please_fill_data", position: 'right', type: 'error' });
    }

  }



  const getsingleservice = (id) => {
    fetch(`http://localhost:3001/servicedetail/${id}`)
      .then(response => response.json())
      .then(value => {
        console.log("data");
        console.log(value);
        setservicedetail(value);
        setServiceForm({
          ...serviceform,
          image: value[0].si_image[0].image,
          price: value[0].s_price,
          name: value[0].s_name,
        });
        console.log(setservicedetail(value));
        setselectedimage(value[0].si_image[0].image);
      })
  }

  const serviceorders = (id) => {
    fetch(`http://localhost:3001/serviceorder/${id}`)
      .then(response => response.json())
      .then(value => {
        console.log("dacvbhdnbvhfvbhdfta");
        console.log(value);
        setserviceorder(value);

      })
  }
  const getreview = () => {
    fetch(`http://localhost:3001/serreview`)
      .then(response => response.json())
      .then(value => {
        console.log("Review");
        console.log(value);
        setservicereview(value);

      })
  }
  useEffect(() => {
    getsingleservice(id);
    serviceorders(id);
    getreview();
    // localStorage.removeItem('cart');
    console.log(localStorage.getItem('cart'));
  }, [])
  return <>
    <div className="maindetailservices">
      {servicedetail && servicedetail.map((val, i) => {
        return (<>


          <div className="containerr">
            <div className="card1" style={{ marginTop: '-54px' }}>

              <div className="wrapper row1" style={{ left: '46%', top: '511px' }}>
                <div className="preview col-md-6">

                  <div className="preview-pic tab-content">
                    <div className="tab-pane active" id="pic-1">
                      <img className="serdeimg" src={`http://127.0.0.1:3001/images/${selectedimage}`} alt="Image not found" />
                    </div>
                  </div>

                  <ul className="preview-thumbnail nav nav-tabs">
                    {val.si_image.map((valu, i) => {
                      return (<>
                        <div className="img-item">
                          <a data-id="1">
                            <img src={`http://127.0.0.1:3001/images/${val.si_image[i].image}`} alt="Image not found" onClick={() => { setselectedimage(val.si_image[i].image) }} id="imgid" style={{ maxWidth: '139%' }} />
                          </a>
                        </div>
                      </>)
                    })}

                  </ul>
                  <div style={{ marginLeft: '47px', border: '2px solid black' }}>
                    <h3 style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Nanum Gothic', margin: '4px' }}>Reviews</h3>
                    {servicereview && servicereview.map((value) => {
                      return (
                        <>
                          <div style={{ margin: '5px', border: '1px solid black' }}>
                            <p>{value.firstname}</p>
                            <ReactStars count={5} size={26} value={value.rate} activeColor="#f5ba1a" isHalf="true" ></ReactStars>
                            <p>{value.rmessage}</p>
                          </div>
                          {/* <textarea name="rmessage" value={value.rmessage} rows="2" cols="2" style={{ height: '51px', width: '290px', margin: '4px' }} placeholder="Review">
  
                      </textarea> */}
                        </>
                      )
                    })}
                  </div>
                </div>
                <div className="details col-md-6" style={{ width: '459px' }}>
                  <h3 className="animate-charcter">{val.s_name}</h3>

                  {/* <p className="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.</p> */}
                  <h4 className="price"> <span><span style={{ color: 'black' }}>Price:</span>{val.s_price}</span></h4>
                  {/* <h4 className="price">current price: <span>$180</span></h4> */}
                  <p className="vote">{Parser(val.s_decs)} </p>


                  {userdata != null ? <>{serviceorder && serviceorder.map((val, i) => {
                    if (val.u_id == userdata.u_id) {
                      return <>
                        <ReactStars count={5} size={26} onChange={getrate} activeColor="#f5ba1a" isHalf="true" ></ReactStars>

                        <textarea name="rmessage" rows="2" cols="2" style={{ height: '51px', width: '290px' }} placeholder="Review" onChange={(e) => {
                          setserviceorder({
                            ...reviewstore,
                            review: e.target.value,
                          });
                        }}>

                        </textarea>
                        <br />

                        <button className="editbtn btn-review" type="submit" value="Submit" onClick={submitreview}>Submit</button>

                      </>
                    }
                  })}</> : <></>}



                  <p style={{ fontSize: '35px', color: 'black', fontWeight: 'bold', fontFamily: 'Nanum Gothic', paddingLeft: '43px' }}>Book Your Services</p>
                  <div id="maindivservices" style={{ border: '2px solid black', borderRadius: '5px', backgroundColor: '#f4f4f5' }}>
                    <form onSubmit={addtocart} >



                      <div className="row">

                        <br />

                        <div className="col-md-12">
                          <div className="form-group">
                            <label for="address" style={{ margin: '8px' }}>Your Address</label>
                            <textarea rows="2" cols="2" placeholder="Enter Your Address" style={{ margin: '10px', height: '63px' }} name="address" onChange={setservicedata} ></textarea>
                            <span style={{ color: 'red' }}>{validator.showMessageFor('address')}{validator.message('address', serviceform.address, 'required')}</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for="date" style={{ margin: '8px' }}>Date</label>
                            <input type="date" className="form-control" id="date" min={formattedDate} name="bdate" style={{ margin: '6px' }} onChange={setservicedata} />
                            <span style={{ color: 'red' }}>{validator.showMessageFor('bdate')}{validator.message('bdate', serviceform.bdate, 'required')}</span>
                          </div>

                        </div><br /><br /><br /><br /><br />
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for="time" style={{ margin: '8px' }}>Time </label>
                            <input type="time" className="form-control" id="time" name="btime" style={{ margin: '-3px' }} onChange={setservicedata} />
                            <span style={{ color: 'red' }}>{validator.showMessageFor('btime')}{validator.message('btime', serviceform.btime, 'required')}</span>
                          </div>

                        </div>

                      </div>
                      <br /><br />
                      <button className="servicesbtn" type="submit">Add to cart</button>
                    </form>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </>)
      })}
    </div>
    <Script />
  </>
}

export default Servicedetail