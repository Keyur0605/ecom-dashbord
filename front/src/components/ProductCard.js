import React from 'react'
import { NavLink } from 'react-router-dom'
const ProductCard = (props) => {



    const { name, p_id, image, price, description } = props.item

    const ditem = (p_id) => {

        props.deleteItem(p_id)
    }


    return (
        <div>

            <div className="card my-3" >
                <img src={image} className="card-img-top" alt="..." style={{ padding: "20px", maxWidth: "100%", height: "300px" }} />
                <div className="card-body">
                    <p className="card-title"> Product Name:- <span className='text-uppercase'>{name}</span></p>
                    <p className="card-text">Product Id:- {p_id}</p>
                    <p className="card-text">Price:- ₹{price}/- </p>
                    <p className="card-text">Description:-{description}</p>
                    {/* <button className='btn btn-danger'  onClick={() => ditem(p_id)}>Delete </button> */}

                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Delete
                    </button>


                    <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Product</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Confirm Delete Your Product
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close" onClick={() => ditem(p_id)} >Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-success mx-3'>  <NavLink to={"/update/" + p_id} style={{ textDecoration: "none", color: "white" }}> Update </NavLink></button>

                </div>
            </div>


        </div>

    )
}

export default ProductCard
