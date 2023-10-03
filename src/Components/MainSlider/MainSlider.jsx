import React from 'react'
import styles from './MainSlider.module.css';
import mainImg1 from '../../images/slider-image-1.jpeg';
import mainImg2 from '../../images/slider-image-2.jpeg';
import mainImg3 from '../../images/slider-image-3.jpeg';
import blog1 from '../../images/blog-img-1.jpeg';
import blog2 from '../../images/blog-img-2.jpeg';
import Slider from 'react-slick';

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };

  return (
    <>
    <div className="container my-5">
      <div className="row gx-0">
        <div className="col-md-9">
        <Slider {...settings}>
          <img className='w-100' height={300} src={mainImg1} alt="" />
          <img className='w-100' height={300} src={mainImg2} alt="" />
          <img className='w-100' height={300} src={mainImg3} alt="" />
        </Slider>
        </div>
        <div className="col-md-3">
          <img className='w-100' height={150} src={blog1} alt="" />
          <img className='w-100' height={150} src={blog2} alt="" />
        </div>
      </div>
    </div>
    </>
  )
}
