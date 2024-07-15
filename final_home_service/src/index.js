import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';

import App from './View/App.js';

const result=
<Suspense fallback={<span>Loading...</span>}>
    <App />
</Suspense>


ReactDOM.render(result,document.getElementById('id1'));
