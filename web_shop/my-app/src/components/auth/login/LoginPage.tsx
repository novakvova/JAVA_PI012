import { FcGoogle } from "react-icons/fc";

import loginImg from "../../../assets/login.jpg";
import { Link } from "react-router-dom";
import { ILoginPage } from "../types";
import * as yup from "yup";
import { useFormik } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
import { APP_ENV } from "../../../env";


const LoginPage = () => {

  const { executeRecaptcha } = useGoogleReCaptcha();

  const initValues : ILoginPage ={
    email: "",
    password: "",
    reCaptchaToken: ""
  };

  const loginSchema = yup.object({
    email: yup.string().required("Поле не повинне бути пустим"),
    password: yup.string().required("Поле не повинне бути пустим"),
  });

  const onSubmitFormik = async (values: ILoginPage) => {
    try {
      if(!executeRecaptcha)
        return;
      //Перевірка чи пройшов перевірку гугл, користувач, чи не є він бот  
      values.reCaptchaToken=await executeRecaptcha();

      const data = await axios.post(
        `${APP_ENV.REMOTE_HOST_NAME}account/login`,
        values
      );
      console.log("Login user token", data);
      //navigator("/");
    } catch (error: any) {
      console.log("Щось пішло не так", error);
    }
  }

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: onSubmitFormik,
    validationSchema: loginSchema
  });

  const {values, errors, touched, handleSubmit, handleChange, setFieldValue} = formik;

  return (
    <>
      <div className="relative w-full h-screen bg-zinc-900/90">
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src={loginImg}
          alt="/"
        />

        <div className="flex justify-center py-10 ">
          <form className="max-w-[400px] w-full mx-auto bg-white p-8" onSubmit={handleSubmit}>
            <h2 className="text-4xl font-bold text-center py-2">Вхід на сайт</h2>
           
            <div className="flex flex-col mb-4">
              <label>Username</label>
              <input className="border relative bg-gray-100 p-2" 
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={values.email}
                />
              {errors.email && 
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.email}</span> 
                
              </p>  
              }
            </div>
            <div className="flex flex-col ">
              <label>Password</label>
              <input
                className="border relative bg-gray-100 p-2"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={values.password}
              />
              {errors.password && 
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.password}</span> 
                
              </p>
              }
            </div>
            <button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white">
              Sign In
            </button>
            <p className="flex items-center mt-2">
              <input className="mr-2" type="checkbox" />
              Remember Me
            </p>
            <Link to="/" className="relative">
              <p className="text-center mt-8">Not a member? Sign up now</p>
            </Link>
            
            <div className="flex justify-between py-8">
              {/* <p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                <AiFillFacebook className="mr-2" /> Facebook
              </p> */}
              <p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                <FcGoogle className="mr-2" /> Google
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
