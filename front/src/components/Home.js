import React, { useState, useEffect } from 'react'
import Header from './Header'
import ProductCard from './ProductCard'
import { Dna } from "react-loader-spinner"
const Home = () => {
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        getData()
    },[])
    const getData = async () => {
        const api = await fetch('/products')
        const responce = await api.json()
        setData(responce)
        setLoader(false)
        

    }
    const delet = async (p_id) => {
         fetch('/products/' + p_id, {
            method: "DELETE"
        })
        //  getData()

        const update=data.filter((current)=>{
            return current.p_id !== p_id
        })
        setData(update)
    }




    return (
        <div>
            <Header />

            <div className="container">
                <div className='row my-4'>

                    {
                        loader ? <>
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
                        </> : <>
                            {
                                !data.length ? <><h3 style={{height: "85vh", display: "flex", justifyContent: "center ", alignItems: "center" }}>Please add products to view them.</h3></> : data.map((val, index) => {
                                    const { p_id } = val
                                    return (
                                        <>
                                            <div className="col-md-4">

                                                <ProductCard key={p_id} item={val} deleteItem={delet} />
                                            </div>

                                        </>
                                    )
                                })
                            }
                        </>
                    }


                </div>
            </div>
        </div>
    )
}

export default Home
