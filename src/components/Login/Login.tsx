import React, {useEffect, useRef, useState} from 'react';
import './Login.css';
import {Button, Classes, FormGroup, InputGroup} from "@blueprintjs/core";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";

function Login() {

  //const auth = useAuth();
  const [authFailed, setAuthFailed] = useState<boolean>(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      // setAuthFailed(false);
      //
      // try {
      //   const res = await axios.post(routes.loginPath(), values);
      //   localStorage.setItem('userId', JSON.stringify(res.data));
      //   auth.logIn();
      //   const { from } = location.state || { from: { pathname: '/' } };
      //   navigate(from);
      // } catch (err) {
      //   formik.setSubmitting(false);
      //   if (err.isAxiosError && err.response.status === 401) {
      //     setAuthFailed(true);
      //     inputRef.current.select();
      //     return;
      //   }
      //   throw err;
      // }
    },
  });

  return (
      <div className="login">
        <div className="login__form">
          <form onSubmit={formik.handleSubmit}>
            <FormGroup labelInfo="username">
              <InputGroup  placeholder="username" />
            </FormGroup>
            <FormGroup labelInfo="password">
              <InputGroup  placeholder="password" />
            </FormGroup>
            <div className="login__footer">
              <Button className="login__button" text={'Log in'}/>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Login;