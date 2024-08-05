import React, { lazy, Suspense } from 'react';

const Home = lazy(() => import('../Home'));
const About = lazy(() => import('../About'));
const Contact = lazy(() => import('../Contact'));
const Login = lazy(() => import('../Loginreg/login'));
const Registration = lazy(() => import('../Loginreg/Registration'));
const Team = lazy(() => import('../Team'));
const Forgot = lazy(() => import('../Loginreg/Forgot'));
const Resetpass = lazy(() => import('../Loginreg/resetpass.js'));
const Otp = lazy(() => import('../Loginreg/otppass.js'));
const Userpass = lazy(() => import('../UserProfile/Userpass'));
const Userprofile = lazy(() => import('../UserProfile/userprofile'));
const Service = lazy(() => import('../Service'));
const Servicedetail = lazy(() => import('../servicedetail'));
const Product = lazy(() => import('../product'));
const ProductDetail = lazy(() => import('../productdetail'));


const Rou = [
    { path: '/', exact: true, element: <Home /> },
    { path: '/About', exact: true, element: <About /> },
    { path: '/Contact', exact: true, element: <Contact /> },
    { path: '/Login', exact: true, element: <Login /> },
    { path: '/Registration', exact: true, element: <Registration /> },
    { path: '/Team', exact: true, element: <Team /> },
    { path: '/Forgot', exact: true, element: <Forgot /> },
    { path: '/Resetpass', exact: true, element: <Resetpass /> },
    { path: '/Otp', exact: true, element: <Otp /> },
    { path: '/Userpass', exact: true, element: <Userpass /> },
    { path: '/Userprofile', exact: true, element: <Userprofile /> },
    { path: '/Service', exact: true, element: <Service /> },
    { path: '/ServiceDetail/:id', exact: true, element: <Servicedetail /> },
    { path: '/product', exact: true, element: <Product /> },
    { path: '/productdetail/:id', exact: true, element: <ProductDetail /> },

];

export default Rou;
