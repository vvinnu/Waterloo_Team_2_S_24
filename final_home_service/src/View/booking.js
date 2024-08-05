import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
// import './book.css';
import Script from './Script/script.js';
import Notification from './Notification/customisenoti';
import { useNavigate } from 'react-router-dom';

function Booking() {
	const { id } = useParams();
	const [booklist, setbooklist] = useState({});
	const [servicedata, setServiceData] = useState({});
	const [error, seterror] = useState({});
	const navigate = useNavigate();
	let err = {}
	const changeData = (event) => {
		console.log(event.target);
		console.log(event.target.value);
		setbooklist({
			...booklist,
			[event.target.name]: event.target.value,
		});

	}
	const submitData = (e) => {
		e.preventDefault();
		console.log("FORM DATA");
		console.log(booklist);
		if (JSON.parse(localStorage.getItem('user') != null)) {
			const requestOptions = {
				method: 'POST',
				body: JSON.stringify({ ...booklist, u_id: JSON.parse(localStorage.getItem('user')).u_id }),
				headers: { "Content-Type": "application/json" }
			};
			fetch('http://localhost:3001/bookservice', requestOptions)
				.then(response => response.json())
				.then(data => {
					if (data.status == 'Success') {
						Notification({ message: data.message, position: 'right', type: 'success' });
						setbooklist({});
						navigate('/');
					}
					else {
						Notification({ message: data.message, position: 'right', type: 'error' });
					}
				});

		}
		else {
			Notification({ message: 'Please Login First', position: 'right', type: 'error' });
			navigate('/login');
		}


	}

	const fetchservice = () => {
		fetch(`http://localhost:3001/servicedetail/${id}`)
			.then(response => response.json())
			.then(data => {
				console.log("data");
				console.log(data[0]);
				let mydata = {};
				Object.keys(data[0]).map((key) => {
					mydata = {
						...mydata,
						[key]: data[0][key]
					};
				})
				setServiceData(mydata);
				setbooklist(mydata);
				// console.log(setservicedetail(mydata))

			})
	}
	useEffect(() => {
		// getbook();
		fetchservice();
		setbooklist({});

	}, []);

	return <>

<div className="space">
<div id="booking" className="section1">
		<div className="section-center">
			<div className="container8">
				<div className="row">
					<div className="booking-form1">
						<div className="form-header1">
							
						</div>
                        <br/><br/><br/>
						<form onSubmit={submitData}>
							<div className="row">
								<div className="col-sm-12">
									<div className="form-group8">
										<span className="form-label8">Services Name</span>
										<input className="form-control" defaultValue={servicedata?.s_name} name="s_name"  value={booklist.s_name ? booklist.s_name : ""} type="text" onChange={changeData} />
									</div>
								</div>
								<br/>
								
						
							<div className="col-sm-12">
							<div className="form-group8">
								<span className="form-label8">Price</span>
								<input className="form-control" defaultValue={servicedata?.s_price} name="s_price" value={booklist.s_price ? booklist.s_price : ""}type="text" onChange={changeData} />
							</div>
							</div>
								<br/>
							<div className="col-sm-12">
							<div className="form-group8">
								<span className="form-label8">Address</span>
								<input className="form-control" defaultValue={servicedata?.address} name="address" value={booklist.address ? booklist.address : ""}type="text" onChange={changeData} />
							</div>
							</div>
								<br/>
							<div className="col_half">
							<div className="form-group8">
								<span className="form-label8">Date</span>
								<input className="form-control" defaultValue={servicedata?.bdate} name="bdate" value={booklist.bdate ? booklist.bdate : ""} type="date" onChange={changeData} />
							</div>
							</div>
								<br/>
							<div className="col_half">
							<div className="form-group8" style={{width:'52%'}}>
								<span className="form-label8">Time</span>
								<input className="form-control" defaultValue={servicedata?.btime} name="btime" value={booklist.btime ? booklist.btime : ""} type="time" onChange={changeData} />
							</div>
							</div>
								<br/>
								</div>
							
							<div className="form-btn">
								<button className="submit-btn">Book Now</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
        </div>


		<Script />
	</>;

}
export default Booking