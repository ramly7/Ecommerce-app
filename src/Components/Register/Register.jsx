import React, { useState } from 'react'
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


export default function Register() {


 const [isLoading,setIsLoading] = useState(false)
 const [apiError,setApiError] = useState('')
 let navigate = useNavigate()


 async function register(values) {
  setApiError('')
  setIsLoading(true)
    console.log("hello from register",values);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((err)=>{
      setIsLoading(false)
      setApiError(err.response.data.message)
    });
    console.log(data);
    if(data.message == "success"){
      setIsLoading(false)
      navigate("/Login")
    }
  }


  // function validate(values) {
  //   let errors = {};
  //   if (!values.name) {
  //     errors.name = "name is required"
  //   } else if (values.name.length < 3) {
  //     errors.name = "name min length is 3 char"
  //   } else if (values.name.length > 15) {
  //     errors.name = "name max length is 15 char"
  //   }

  //   if (!values.email) {
  //     errors.email = "email is required"
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //   }

  //   if (!values.password) {
  //     errors.password = "password is required"
  //   } else if (!/^[A-Z][a-z0-9]{5-8}$/i.test(values.password)) {
  //     errors.password = 'Invalid password';
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = "rePassword is required"
  //   } else if (values.rePassword != values.password) {
  //     errors.rePassword = 'repassword and password should match'; 
  //   }

  //   if (!values.phone) {
  //     errors.phone = "phone is required"
  //   } else if (!/^01[0125][0-9]{8}$/i.test(values.phone)) {
  //     errors.phone = 'Invalid phone number';
  //   }

  //   return errors
  // }


let validationSchema = Yup.object({
     name: Yup.string().max(15,"name should be less than 15 char").min(3,"name min length is 3 char").required("name is required"),
      email: Yup.string().email("email not valid").required("email is required"),
      password: Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/,"password should start with cap char").required("password is required"),
      rePassword: Yup.string().oneOf([Yup.ref("password")],"rePassword should match password").required("password is required"),
      phone: Yup.string().matches(/^01[0125][0-9]{8}$/,"phone should start with 01/0/1/2/5 and length is 11 numbers").required("phone is required")
})


  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema : validationSchema,
    onSubmit: (values) => register(values)
  })


  return (
    <>
      <div className="container my-5">
        <h2 className='mb-3'>Register Now :</h2>
        {apiError ? <div className='alert alert-danger'>{apiError}</div> : ""}
        <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="name">Name</label>
            <input type="text" id='name' className='form-control' name='name'
              value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.name ? <div className="alert alert-danger">{formik.errors.name}</div> : ""}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">E-mail</label>
            <input type="email" id='email' className='form-control' name='email'
              value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' className='form-control' name='password'
              value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="rePassword">RePassword</label>
            <input type="password" id='rePassword' className='form-control' name='rePassword'
              value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ""}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id='phone' className='form-control' name='phone'
              value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ""}
          </div>
          {isLoading ? <button className='btn btn-primary text-white ms-auto d-block'>
            <i className='fa fa-spin fa-spinner'></i>
          </button> : <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-primary text-white ms-auto d-block'>Register</button>}
          
          
        </form>
      </div>
    </>
  )
}
