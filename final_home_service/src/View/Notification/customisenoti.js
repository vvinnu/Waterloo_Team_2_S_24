import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const Notification = (obj = {message: 'yes', position: 'center', type: 'success'
}) => {
    if (obj.message == undefined) {
        obj['message'] = "ok yes";
    }
    let newob = {
        position: toast.POSITION.BOTTOM_LEFT
    };
    if(obj.position=='center'){
        newob['position']=toast.POSITION.BOTTOM_CENTER;
     }
     if(obj.position=='right'){
        newob['position']=toast.POSITION.BOTTOM_RIGHT;
     }
     if(obj.type=='success'){
        return toast.success(obj.message,newob);
     }
     else if (obj.type=='error') {
        return toast.error(obj.message,newob);
     }
     else if (obj.type=='info') {
        return toast.info(obj.message,newob);
     }

}

export default Notification;