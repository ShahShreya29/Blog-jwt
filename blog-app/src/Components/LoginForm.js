import TextField from "./TextField";
import AddBtn from "./AddBtn";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
// import api from "../config";

const LoginForm = () => {
  const validate = yup.object({
    email: yup.string().email("invalid email").required("email is required"),
    password: yup
      .string()
      .required("Password is Required")
      .min(6, "At Least 6 Character"),
  });
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/login",
        values
      );
      console.log("res", response.data);
      localStorage.setItem(
        "login",
        JSON.stringify({
          login: true,
          name: response.data.user.name,
          accessToken: response.data.accessToken.accessToken,
          refreshToken: response.data.accessToken.refreshToken,
        })
      );
      console.log("resTOKEN", response.data.accessToken.refreshToken);
      sessionStorage.setItem("refreshToken", response.data.accessToken.refreshToken);
      let rt = sessionStorage.getItem("refreshToken");
      console.log(rt);

      alert("Login Successfully Done " + " " + response.data.user.name);
      setUserData({
        email: "",
        password: "",
      });

      if (response.data.user.role === "admin") {
        navigate("/BlogList");
      } else {
        navigate("/Blogs");
      }
    } catch (error) {
      alert("User not found");
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={handleLogin}
      >
        {(Formik) => (
          <div className="container m-5">
            <Form>
              <div className="row justify-content-center">
                <div className="form-group col-md-4 col-md-offset-5 align-center ">
                  <h1 className="m-5 text-center">Login </h1>
                  <TextField label="Email: " type="email" name="email" />
                  <TextField
                    label="Password: "
                    type="password"
                    name="password"
                  />
                  <div>
                    <AddBtn
                      style={{
                        marginLeft: "130px",
                        marginTop: "10px",
                        backgroundColor: "#1070ef",
                        color: "white",
                        width: "99px",
                      }}
                    >
                      LogIn
                    </AddBtn>
                  </div>
                </div>
                <h6 className="text-center m-3">
                  PLEASE <Link to="/">SIGNUP!!</Link> FIRST
                </h6>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
