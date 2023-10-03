import React, { useContext } from 'react'
import styles from './Home.module.css';
import { tokenContext } from '../../context/tokenContext';
import FeatureProducts from '../featureProducts/featureProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';



export default function Home() {

  

  return (
    <>
    <MainSlider/>
    <CategoriesSlider/>
    <FeatureProducts/>
    </>
  )
}
