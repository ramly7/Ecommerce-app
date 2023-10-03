import React, { useContext, useEffect, useState } from 'react'
import styles from './Details.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import Slider from "react-slick";
import { CartContent } from '../../context/cartContext';
import toast, { Toaster } from 'react-hot-toast';

export default function Details() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };

  const[details,setDetails] = useState({})
  const[isLoading,setIsLoading] = useState(true)
  let{addToCart,setNumOfCartItems} = useContext(CartContent);

  let params = useParams()

  // function getProductDetails(id){
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  // }

  // let {data, isLoading} = useQuery("details",()=> getProductDetails(params.id)) 


  async function getProductDetails(id){
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setDetails(data.data)
      setIsLoading(false)
     }

     async function addCart(id){
      let res = await addToCart(id)
      if(res.data.status == "success"){
        toast.success('product added successfully');
        setNumOfCartItems(res.data.numOfCartItems)
      }else{
        toast.error('failed to add this product');
      }
      }


  useEffect(()=>{
    getProductDetails(params.id)
  },[])
  return (
    <>
    {isLoading ? <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle=''
  wrapperClass=""
  visible={true}
/> : 
 <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
        <Slider {...settings}>
      {details.images.map((ele, index)=> <img key={index} src={ele} alt='img'/>)}
    </Slider>
        </div>
        <div className="col-md-8">
          <h2>{details.title}</h2>
          <p>{details.description}</p>
          <p>{details.category.name}</p>
          <div className="d-flex justify-content-between">
             <p>{details.price}EGP</p>
             <p>
             {details.ratingsAverage}
               <i className='fa fa-star rating-color'></i>
             </p>
           </div>
           <button onClick={()=>addCart(details.id)} className='btn btn-primary w-100'>Add to Cart</button>
        </div>
      </div>
    </div>
}
    </>
  )
}
