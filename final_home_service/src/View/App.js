import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import React, { Suspense } from 'react';
import Header from './header.js';
import Footer from './footer.js';
import Rou from './Routes/Routes';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {Rou.map((value, i) => (
              <Route key={i} path={value.path} exact={value.exact} element={value.element} />
            ))}
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </>
  );
}

export default App;
