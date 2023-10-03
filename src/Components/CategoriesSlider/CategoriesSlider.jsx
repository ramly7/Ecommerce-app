import React from 'react'
import styles from './CategoriesSlider.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay:true
  };

  function getCategories(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let {data} = useQuery("getCategories",getCategories)
  console.log(data);

  return (
    <>
    <div className="container text-center gx-1">
    <Slider {...settings}>
      {data?.data?.data.map((ele)=><>
      <img width={200} height={300} src={ele.image} alt="img" />
      <h4>{ele.name}</h4>
      </>)}
    </Slider>
    </div>
    </>
  )
}
