import React,{useState} from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Otp = () => {
    const [otp, setOtp] = useState("")
    const {email}=useParams()
  const otpsCheck=(e)=>{
    e.preventDefault()
    if(otp === ""){
        toast.error('Please Enter OTP ', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
    else{
        const item={otp}
        fetch(`/forgetpassword/${email}`,{
            headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(item)
        }).then((responce)=>{
            if(responce.status === 200){
                toast.success('OTP match ', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
            else if(responce.status === 400){
                toast.error(' OTP Not Match', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
  }

  return (
  
    <div className='container'>
        <div className="row">
            <div className="col-7 mx-auto">

            </div>
        </div>
       <ToastContainer/>
    </div>
  )
}

export default Otp
