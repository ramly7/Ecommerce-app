import React, { useContext, useState } from 'react'
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { tokenContext } from '../../context/tokenContext';




export default function Login() {


  const [isLoading,setIsLoading] = useState(false)
  const [apiError,setApiError] = useState('')
  let navigate = useNavigate()
  let {setToken} = useContext(tokenContext)
 
 
  async function login(values) {
   setApiError('')
   setIsLoading(true)
     console.log("hello from register",values);
     let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch((err)=>{
       setIsLoading(false)
       setApiError(err.response.data.message)
     });
     console.log(data);
     if(data.message == "success"){
       setIsLoading(false)
       localStorage.setItem("userToken",data.token)
       setToken(data.token)
       navigate("/")
     }
   }



  let validationSchema = Yup.object({
     email: Yup.string().email("email not valid").required("email is required"),
     password: Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/,"password should start with cap char").required("password is required")
})


 let formik = useFormik({
   initialValues: {
     email: "",
     password: ""
   },
   validationSchema : validationSchema,
   onSubmit: (values) => login(values)
 })

  return (
    <>
    <div className="container my-5">
        <h2 className='mb-3'>Login Now :</h2>
        {apiError ? <div className='alert alert-danger'>{apiError}</div> : ""}
        <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
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
          {isLoading ? <button className='btn btn-primary text-white ms-auto d-block'>
            <i className='fa fa-spin fa-spinner'></i>
          </button> : <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-primary text-white ms-auto d-block'>Login</button>}
          
          
        </form>
      </div>
    </>
  )
}
