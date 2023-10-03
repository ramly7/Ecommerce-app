import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css';
import { CartContent } from '../../context/cartContext';
import { Bars } from 'react-loader-spinner';
import {Link} from 'react-router-dom';

export default function Cart() {

  const [CartDetails , setCartDetails] = useState({})

  let{getCart , deleteProductFromCart , updateProductQuantity , setNumOfCartItems} = useContext(CartContent)

  async function removeItem(id){
    let {data} = await deleteProductFromCart(id)
    setNumOfCartItems(data.numOfCartItems)
    setCartDetails(data)
  }

  async function updateCount(id,count){
    let {data} = await updateProductQuantity(id,count)
    setCartDetails(data)
  }

  async function getCartDetails(){
    let {data} = await getCart()
    setNumOfCartItems(data.numOfCartItems)
    setCartDetails(data)
  }

  useEffect(()=>{
    getCartDetails()
  },[])

  return (
    <>
    {CartDetails.data ? <div className="container my-5">
      <div className="p-5 mx-auto bg-main-light">
        <h1 className='mb-3'>Cart Shop</h1>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className='h6'>Total Price : <span className='text-primary'>{CartDetails.data.totalCartPrice}EGP</span></h3>
          <h3 className='h6'>Total Cart Items : <span className='text-primary'>{CartDetails.numOfCartItems}</span></h3>
        </div>
        {CartDetails.data.products.map((ele)=> <div key={ele.product._id} className="row py-2 border-bottom">
          <div className="col-md-1">
            <img className='w-100' src={ele.product.imageCover} alt="" />
          </div>
          <div className="col-md-11">
            <div className="d-flex justify-content-between">
              <div className="left-side">
                <h4 className='h6'>{ele.product.title}</h4>
                <p><span className='text-primary'>{ele.price}</span>EGP</p>
              </div>
              <div className="right-side d-flex align-items-center">
                <button className='btn btn-outline-primary h-50' onClick={()=>updateCount(ele.product._id, ele.count -1)}>-</button>
                <p className='mx-2'>{ele.count}</p>
                <button className='btn btn-outline-primary h-50' onClick={()=>updateCount(ele.product._id, ele.count +1)}>+</button>
              </div>
            </div>
            <button className='btn text-danger p-0' onClick={()=>removeItem(ele.product._id)}><i className='fa fa-trash-can'></i> remove</button>
          </div>
        </div> )}
        <Link className='btn w-100 btn-primary mt-5 text-white' to={'/checkout'}>Checkout</Link>
        
      </div>
    </div> : <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle=''
  wrapperClass={"justify-content-center"}
  visible={true}
/> }  
    </>
  )
}
