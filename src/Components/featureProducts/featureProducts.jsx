import React, { useContext, useEffect, useState } from 'react'
import styles from './featureProducts.module.css';
import axios from 'axios';
import {Bars} from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContent } from '../../context/cartContext';
import toast, { Toaster } from 'react-hot-toast';


export default function FeatureProducts() {

  let{addToCart,setNumOfCartItems} = useContext(CartContent);


function getProducts(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
}

let {isLoading ,data} = useQuery("featuredProducts", getProducts)

  async function addCart(id){
let res = await addToCart(id)
if(res.data.status == "success"){
  toast.success('product added successfully');
  setNumOfCartItems(res.data.numOfCartItems)
}else{
  toast.error('failed to add this product');
}
}

//   let [products,setProducts] = useState([])
//   let [isLoading,setIsLoading] = useState(true)


// async function getProducts(){
//  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//  setProducts(data.data)
//  setIsLoading(false)
// }


// useEffect(()=>{
//   getProducts()
// },[])

  return (
    <>
    <div className="container py-5">
      {isLoading ? <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle=''
  wrapperClass={"justify-content-center"}
  visible={true}
/> : <div className="row">
        {data?.data?.data.map((ele)=>
           <div key={ele.id} className="col-md-2">
           <div className="product px-2 py-3">
            <Link className='text-dark' to={'details/' + ele.id}>
            <img src={ele.imageCover} className='w-100' alt="" />
           <p className='text-primary'>{ele.category? ele.category.name : "category"}</p>
           <h3 className='h6'>{ele.title.split("").slice(0,15).join("")}</h3>
           <div className="d-flex justify-content-between">
             <p>{ele.price}EGP</p>
             <p>
               <i className='fa fa-star rating-color'></i>
               {ele.ratingsAverage}
             </p>
           </div>
            </Link>
           
           <button onClick={()=>addCart(ele.id)} className='btn btn-primary text-white w-100'>Add To Cart</button>
           </div>
         </div>
        )}
        
      </div>}
    </div>
    </>
  )
}
