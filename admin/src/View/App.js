import React from 'react';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'; 
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Rou from './Router/Router';
import Dash from './Dashboard';
import Form from './Category';

function App() {
  return (
  <>

  <Router>
  <div className="container-scroller">
  <Sidebar/>
  <div className="container-fluid page-body-wrapper">
    <Header/>
    
      <Routes>
         {/* <Route path="/" element={<Header/>}> */}
        {/* <Route path="/" element={<Dash/>}></Route> */}
        {/* <Route path="/Form" element={<Form/>}></Route>  */}
        {/* <Route path="/Service" element={<Service/>}></Route>
        <Route path="/Team" element={<Team/>}></Route>
        <Route path="/Contact" element={<Contact/>}></Route> */}
         {Rou.map((value,i)=>{
            return <Route key={i} path={value.path} exact={value.exact} element={<value.element />}></Route>
          }
          )}

        {/* </Route> */}
      </Routes> 
      </div>
      </div> 
    <Footer/>
    
   
    </Router>
    </>
  );
}

export default App