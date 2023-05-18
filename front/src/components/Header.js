import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Header = () => {
  
  const navigate = useNavigate()


  const logout =  (e) => {
    e.preventDefault()

    fetch('/logout', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

    }).then(async(response)=>{
    
      const responseData = await response.json();

      alert(responseData.msg)
    })
    localStorage.clear()
    navigate('/register')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <h2> Admin Dashbord</h2>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto">
              {
                localStorage.getItem("jwt") ?
                  <>
                    <NavLink to="/" className="ms-4" style={{ textDecoration: "none", color: "black", fontSize: "18px" }}>Home</NavLink>
                    <NavLink to="/add " className="ms-4" style={{ textDecoration: "none", color: "black", fontSize: "18px" }}>Add</NavLink>

                  </> :
                  <>
                    <NavLink to="/" className="ms-4" style={{ textDecoration: "none", color: "black", fontSize: "18px" }}>Register</NavLink>
                    <NavLink to="/login" className="ms-4" style={{ textDecoration: "none", color: "black", fontSize: "18px" }}>Login</NavLink>
                  </>
              }





            </div>
          </div>
          {
            localStorage.getItem("jwt") ? <div className="dropdown me-5 pe-5">
              <button onClick={logout} className='btn btn-primary'>Logout</button>
            </div> : null
          }


        </div>
      </nav>
    </div>
  )
}

export default Header
