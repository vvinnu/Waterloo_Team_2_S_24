import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Script from './Script/script.js'
import Parser from 'html-react-parser';
import SimpleReactValidator from 'simple-react-validator';
import ReactStars from 'react-rating-stars-component';
import Notification from './Notification/customisenoti';
import { useNavigate } from 'react-router-dom';

function Productdetail() {
  let { id } = useParams();

  let userdata = JSON.parse(localStorage.getItem('user'));
  console.log("USER profile DATA");
  console.log(userdata);

  const navigate = useNavigate();
  const validator = new SimpleReactValidator();
  const [productdetail, setproductdetail] = useState([]);
  const [userproduct,setUserproduct]=useState();
  const [productreview,setProductreview] = useState([]);
  const [reviewstore,setreviewstore]=useState({
    rate:0,
    review:'',
  });
  const [productform, setproductform] = useState({
    id: id,
    image: '',
    qty: 1,
    bdate: '',
    name: '',
    price: 0,
    address: '',
  });

  const setproductdata = (e) => {
    setproductform({
      ...productform,
      [e.target.name]: e.target.value,
    });
  }

  const addtocart = (e) => {
    e.preventDefault();
    if (validator.allValid()) {

      if (JSON.parse(localStorage.getItem('user') != null)) {

        console.log(productform);

        let mycart = JSON.parse(localStorage.getItem('productcart'));

        console.log(localStorage.getItem('productcart'))
        console.log("MCART = " + mycart);
        // let mycart = [];
        if (mycart != null) {

          let find = '';
          Object.keys(mycart).map((key) => {
            if (mycart[key].id == productform.id) {
              find = key;
            }
          })

          if (find != '') {
            mycart[find].qty = parseInt(mycart[find].qty) + parseInt(productform.qty);
          }
          else {
            mycart.push(productform);
          }
          localStorage.setItem('productcart', JSON.stringify(mycart));
        }
        else {
          localStorage.setItem('productcart', "[" + JSON.stringify(productform) + "]");
        }
        Notification({ message: "Add_to_cart", position: 'right', type: 'success' });
        navigate('/productcartdata');
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

  const productorder = (id) =>{
    fetch(`http://localhost:3001/productorder/${id}`)
    .then(response => response.json())
    .then(value => {
      console.log("dacvbhdnbvhfvbhdfta");
      console.log(value);
      setUserproduct(value);
     
    })
  }

  const getsingleservice = (id) => {
    fetch(`http://localhost:3001/getsingleproduct/${id}`)
      .then(response => response.json())
      .then(value => {
        console.log("data");
        console.log(value);
        setproductdetail(value);
        setproductform({
          ...productform,
          image: value[0].p_image,
          price: value[0].p_price,
          name: value[0].p_name,
        });
        console.log(setproductdetail(value));

      })
  }
  const getrate = (rate)=>{
    setreviewstore({
      ...reviewstore,
      rate:rate,
    });
  }
  const submitreview = ()=>{
    console.log(reviewstore);
    let formdate={
      rate:reviewstore.rate,
      reviews:reviewstore.review,
      p_id:id,
      u_id:JSON.parse(localStorage.getItem('user')).u_id,
    };
    console.log(formdate);

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(formdate),
      headers: { "Content-Type": "application/json" }
    };
    fetch('http://localhost:3001/rating', requestOptions)
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
  const getreview = () => {
    fetch(`http://localhost:3001/proreview`)
      .then(response => response.json())
      .then(value => {
        console.log("Review");
        console.log(value);
        setProductreview(value);

      })
  }
  useEffect(() => {
    getsingleservice(id);
    productorder(id);
    getreview();
    console.log(localStorage.getItem('cart'));
  }, []);
  
  return <>
  <section  className="maindetail">
    {productdetail && productdetail.map((val) => {
      return (<>
        <main id="main" className="site-main" style={{ marginTop: '-83px'}}>
          <div className="woocommerce-notices-wrapper"></div>
          <div id="product-10562" style={{ display: 'flex' }}>
            <div className="woocommerce-product-gallery woocommerce-product-gallery--with-images woocommerce-product-gallery--columns-4 images" data-columns="4" style={{ opacity: '1', transition: 'opacity 0.25s ease-in-out 0s',marginRight:'117px' }}>
              <figure className="woocommerce-product-gallery__wrapper">
                <div >
                  <img src={`http://127.0.0.1:3001/images/${val.p_image ? val.p_image : '123.jpg'}`} width="492px" style={{ marginTop: '86px',marginLeft:'80px' }} />
                </div>
              </figure>
              <div style={{ marginLeft: '47px', border: '2px solid black' }}>
                      <h3 style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Nanum Gothic', margin: '4px' }}>Reviews</h3>
                  {productreview && productreview.map((value)=>{
                    return(
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
            <div className="summary entry-summary" style={{ marginTop: '100px', width: '620px', paddingLeft: '-30px', marginRight: '212px' }}>
  
                    <h3 className="animate-charcter">{val.p_name}</h3>
              <br/><br/><br/>
            {/* <div className="summary entry-summary" style={{ marginTop: '100px', width: '620px', paddingLeft: '-30px', marginLeft: '187px' }}>
              <h1 style={{ fontSize: '26px', lineHeight: '40px', fontFamily: 'Muli,Arial,Helvetica,sans-serif', fontWeight: '700', fontSize: '32px', lineHeight: '42px', color: '#052944' }}>{val.p_name}</h1> */}
              <p style={{ fontSize: '26px', marginLeft: '2px', color: 'black', fontWeight: 'bold', fontSize: '24px', marginTop: '-49px' }}></p>

              <h4 className="price"> <span><span style={{ color: 'black'}}>Price:</span>{val.p_price}</span></h4>
              
              <div className="woocommerce-product-details__short-description">
                {/* <p style={{ fontSize: '20px' }}>{Parser(val.p_decs)}</p> */}
                <p className="vote">{Parser(val.p_desc)} </p>
              </div>

             {userproduct && userproduct.map((val,i) => {
               if(val.u_id==userdata.u_id){
               return <>
                  <ReactStars count={5} size={26} onChange={getrate} activeColor="#f5ba1a" isHalf="true"></ReactStars>
              
              <textarea name="rmessage" rows="2" cols="2" style={{height:'51px',width:'290px'}} placeholder="Review" onChange={(e)=>{
                     setreviewstore({
                       ...reviewstore,
                     review:e.target.value,
              });
            }}>

            </textarea>
            <br/>
            
            <button className="editbtn btn-review" type="submit" value="Submit" onClick={submitreview}>Submit</button>
           
               </>}
              })}
              
              

              <p style={{ fontSize: '35px', color: 'black', fontWeight: 'bold', fontFamily: 'Nanum Gothic', paddingLeft: '43px' }}>Book Your Product</p>
              <div id="maindivservices" style={{border:'2px solid black',  borderRadius: '5px',width:'380px'}}>
                 <form onSubmit={addtocart} >



                        <div className="row">

                          <br />
                          <div className="col-md-11">
                            <div className="form-group">
                              <label for="time" style={{ margin: '8px 8px 8px 15px' }}>Quantity :</label>
                              <input type="number" className="form-control" min="1" defaultValue="1" name="qty" style={{ marginLeft: '15px' }} onChange={setproductdata} />
                              <span style={{ color: 'red'}}>{validator.showMessageFor('qty')}{validator.message('qty', productform.qty, 'required')}</span>
                            </div>

                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label for="address" style={{ margin: '8px 8px 8px 10px' }}>Your Address</label>
                              <textarea  rows="2" cols="2" placeholder="Enter Your Address"  style={{ margin: '0px 10px',height:'63px'}} name="address" onChange={setproductdata} ></textarea>
                              <span style={{ color: 'red' }}>{validator.showMessageFor('address')}{validator.message('address', productform.address, 'required')}</span>
                            </div>
                          </div>
                       
                          

                        </div>
                        <br /><br />
                        <button className="servicesbtn" type="submit">Add to cart</button>
                        
                      </form>
                <br />
              </div>
            </div>
          </div>

       
        </main>
      </>)
    })}
</section>
    <Script />

  </>
}

export default Productdetail