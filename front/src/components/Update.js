import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Dna } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Update = () => {
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [loader, setLoader] = useState(false)
    // const [modal, setModal] = useState(false)
    const navigate=useNavigate()
    const { id } = useParams()
    const getData = async () => {
        const api = await fetch(`/products/${id}`);
        const responce = await api.json();
        setName(responce[0].name)
        setPrice(responce[0].price)
        setImage(responce[0].image)
        setDescription(responce[0].description)
        setLoader(true)
    }
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

    useEffect(() => {
        getData()
    }, [])


    const edit = (e) => {
        e.preventDefault()
        const a = { name, image, price, description }

        fetch(`/products/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(a),

        }).then(async (response) => {
          
        if(response.status === 204){
            // toast.success('Product Updated', {
            //     position: "top-right",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            //     });
                navigate("/")

        }

        else if(response.status === 400){
            toast.error('Bad request', {
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
        }).catch((error) => {
            console.log(error);
        })

    }




    return (
        <div>

            {
                loader ?
                    <><div className="container mt-5">
                        <h1 className='text-center'>Update Product Details</h1>
                        <div className="row" >
                            <div className="col-7 mx-auto">
                                <div style={{ alignItems: "center", display: "flex", height: "100%" }}>


                                    <form style={{ width: "100%" }}>
                                        <div className="mb-3">

                                            <input type="text" placeholder='Enter Your Name' className='form-control' name='name' defaultValue={name} onChange={(e) => setName(e.target.value)} />
                                        </div>

                                        <div className="mb-3">

                                            <input type="file" placeholder='choose your file' className='form-control' name='image' onChange={imagesAdd} /><br />

                                            <img src={image} alt="" width="400px" />

                                        </div>
                                        <div className="mb-3">

                                            <input type="number" placeholder='Enter Product Price' className='form-control' defaultValue={price} name='price' onChange={(e) => setPrice(e.target.value)} />
                                        </div>
                                        <div className="mb-3">

                                            <input type="text" placeholder='Enter Product Description' className='form-control' defaultValue={description} name='description'
                                                onChange={(e) => setDescription(e.target.value)} />
                                        </div>

                                        {/* <button className='btn btn-primary' onClick={edit}>Save Change</button> */}
                                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Update
                                        </button>


                                      <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Update Product</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        Confirm Update Your Product
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={edit}>Update Changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <NavLink to="/"><button className='btn btn-primary mx-4'>Home Page</button></NavLink>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                    </> : <>
                        <div style={{ height: "85vh", display: "flex", justifyContent: "center ", alignItems: "center" }}>

                            <div className='d-flex  '>
                                <Dna
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="dna-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="dna-wrapper"
                                />
                            </div>
                        </div>
                    </>
            }
             <ToastContainer/>
        </div>
       
    )
}

export default Update
