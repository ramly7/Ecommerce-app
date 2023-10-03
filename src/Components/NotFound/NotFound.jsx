import React from 'react'
import styles from './NotFound.module.css';
import errorImg from '../../images/error-404.jpg'

export default function NotFound() {
  return (
    <>
    <div className="container d-flex align-items-center justify-content-center">
      <img src={errorImg} alt="error-404"/>
    </div>
    </>
  )
}
