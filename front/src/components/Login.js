import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header'
const Login = () => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
const navigate=useNavigate()
  useEffect(() => {
    if( localStorage.getItem("jwt")){
  
    
    }
   
  }, [])
  // Add data to the database
  const addData = (e) => {
    e.preventDefault()
    let item = { email, pass }
    
    // when user not fill data then show alert
    if (email === "" || pass === "") {
      alert("plz fill form data")
    }
    else {
      fetch("/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(item)
      }).then(async(response) => {
       
  const resData=await response.json()
      
        if (response.status === 201) {
        alert(resData.msg)
          const data= document.cookie
          const coki=data.split('=');
          localStorage.setItem(`${coki[0]}`, JSON.stringify(coki[1]))
          navigate('/')
        }
        if (response.status === 401) {
          alert(resData.msg)
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

          <h1 className='text-center my-4'>Login</h1>
          <div className="col-sm-6 mx-auto ">

            <form>


              <div className="mb-3">

                <input type="email" placeholder='Enter Your Email' className='form-control' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">

                <input type="password" placeholder='Enter Your password' className='form-control' name='pass' value={pass} onChange={(e) => setPass(e.target.value)} required />
              </div>




              <button type="submit" className="btn btn-primary" onClick={addData}>Submit</button>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
