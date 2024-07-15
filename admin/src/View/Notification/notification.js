import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Notification from './customisenoti'

function Noti(){
    const notify = () => {
    // toast("Wow so easy!");
    Notification({position:'left', type:'info'});
    // Notification()
}

    return (<>
        <button onClick={notify}>Click</button>
        </>);
  }

  export default Noti;