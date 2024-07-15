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
   
    
]

export default Rou;