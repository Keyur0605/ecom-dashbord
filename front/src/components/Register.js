import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [name, setName] = useState("");

const navigate= useNavigate()

useEffect(() => {
  if( localStorage.getItem("jwt")){

    
  }
 
}, [])
// Add data to the database
  const addData = (e) => {
    e.preventDefault()
    let item = {  name,email,pass}
 
    
    // when user not fill data then show alert
    if (email === "" || pass === "" || cpass==="" || name === "" ) {
      toast.error('Plz Fill The Form Data', {
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
      else if(pass !== cpass){
        // alert("password and conform password not match plz enter same pasword")
        toast.error('password and conform password not match plz enter same pasword', {
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
     
      
      else {
        fetch("/register", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(item)
        }).then(async(response) => {
         const resData= await response.json()
          if(response.status === 201){
            // alert(resData.msg);
           
            navigate('/login')
        
          }
            
          if(response.status === 409 || response.status === 400){
            // alert(resData.msg)
            toast.error(resData.msg, {
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
          
        }).catch(error => {
          console.log(error)
        });
      }
  
  

  }


  return (
    <>
 <Header/>
    <div className='container'>
      <div className="row">
      
        <h1 className='text-center my-4'>Registation</h1>
        <div className="col-sm-6 mx-auto ">

          <form>
           
            <div className="mb-3">

              <input type="text" placeholder='Enter Your Name' className='form-control' name='name' value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">

              <input type="email" placeholder='Enter Your Email' className='form-control' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
              
            </div>
            <div className="mb-3">

              <input type="password" placeholder='Enter Your password' className='form-control' name='pass' value={pass} onChange={(e) => setPass(e.target.value)} required />
            </div>
            <div className="mb-3">

              <input type="password" placeholder='Enter Your conform Password' className='form-control' name='cpass' value={cpass} onChange={(e) => setCpass(e.target.value)} required />
            </div>
          
            

            <button type="submit" className="btn btn-primary" onClick={addData}>Submit</button>
            {/* <button type="submit" className="btn btn-primary" onClick={asd}>replace</button> */}
          </form>
        </div>
      </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default Register
