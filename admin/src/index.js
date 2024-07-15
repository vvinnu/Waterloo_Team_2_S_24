import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';

import App from './View/App';


const result=
<Suspense fallback={<span>Loading...</span>}>
    <App />
</Suspense>


ReactDOM.render(result,document.getElementById('root'));
