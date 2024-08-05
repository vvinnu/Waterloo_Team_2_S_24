import React,{lazy}  from 'react';

const Rou=[
    {
        path:'/',
        exact:true,
        element: lazy(() => import('../Dashboard')),
    },
    
    {
        path:'/Login',
        exact:true,
        element:lazy(()=>import('../Login/logadmin')),
    },
    {
        path:'/adminreg',
        exact:true,
        element:lazy(()=>import('../Login/adminreg')),
    },
    {
        path:'/forgot',
        exact:true,
        element:lazy(()=>import('../Login/Forgot')),
    },
    {
        path:'/Otp',
        exact:true,
        element:lazy(()=>import('../Login/otppass')),
    },
    {
        path:'/Resetpass',
        exact:true,
        element:lazy(()=>import('../Login/resetpass')),
    },
    {
        path:'/password',
        exact:true,
        element:lazy(()=>import('../password')),
    },
    {
        path:'/Services',
        exact:true,
        element:lazy(()=>import('../Services')),
    },
    {
        path:'/Category',
        exact:true,
        element:lazy(()=>import('../Category')),
    },
    {
        path:'/Country',
        exact:true,
        element:lazy(()=>import('../country')),
    },
    {
        path:'/Editcountry/:id',
        exact:true,
        element:lazy(()=>import('../editcountry')),
    },
    {
        path:'/State',
        exact:true,
        element:lazy(()=>import('../state')),
    },
    {
        path:'/City',
        exact:true,
        element:lazy(()=>import('../city')),
    },
    {
        path:'/Editcity/:id',
        exact:true,
        element:lazy(()=>import('../editcity')),
    },
    {
        path:'/Product',
        exact:true,
        element:lazy(()=>import('../product')),
    },
    
]

export default Rou;