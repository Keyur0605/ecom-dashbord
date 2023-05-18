import React, { useState } from 'react'
import Header from './Header';
import { NavLink } from 'react-router-dom';
const Add = () => {
  const [name, setName] = useState("")
  const [p_id, setPId] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")

  const [description, setDescription] = useState("")
  
  const imagesAdd = (e) => {
    const render = new FileReader()
    render.readAsDataURL(e.target.files[0]);
    render.onload = () => {

      setImage(render.result)
    };
    render.onerror = (error) => {
      console.log(error);
    }
  }


  const addData = (e) => {
    e.preventDefault()
  
    const item = { name, p_id, image, price, description }

    if (name === "" || p_id === "" || image === "" || price === "" || description === "") {
      alert("plz fill the product details")
    }
    else {
      fetch('/products', {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(item)
      }).then(async (response) => {

        const rsponsdata = await response.json()
      
        if (response.status === 201) {
          setImage("")
          setDescription("")
          setName("")
          setPId("")
          setPrice("")

        }

        if (response.status === 409) {
          alert(rsponsdata.msg)
        }
        if (response.status === 400) {
          alert(rsponsdata.msg)
        }

      }).catch((error) => {
        console.log(error, "error");
      })
    }
   

  }
  return (
    <>
      <Header />

      <div className='container'>
        <div className="row">

          <div className="col-sm-6 mx-auto ">
            <div style={{ alignItems: "center", display: "flex", height: "80vh" }}>


              <form style={{ width: "100%" }} >
                <div className="mb-3">

                  <input type="text" placeholder='Enter Your Name' className='form-control' name='name' value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">

                  <input type="text" placeholder='Product id' className='form-control' name='p_id' value={p_id} onChange={(e) => setPId(e.target.value)} required />
                </div>
                <div className="mb-3">

                  <input type="file" placeholder='choose your file' className='form-control' name='image' onChange={imagesAdd} required /><br />
                  <img src={image} alt="" width="400px" />

                </div>
                <div className="mb-3">

                  <input type="number" placeholder='Enter Product Price' className='form-control' value={price} name='price' onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="mb-3">

                  <input type="text" placeholder='Enter Product Description' className='form-control' value={description} name='description' onChange={(e) => setDescription(e.target.value)} required />
                </div>


                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add Product
                </button>


                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                       
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        Add This Product
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" aria-label="Close" onClick={addData}>Add</button>
                      </div>
                    </div>
                  </div>
                </div>
                <NavLink to="/" style={{ textDecoration: "none", color: "white" }}> <button className='btn btn-success'>Home Page</button></NavLink>





              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Add
