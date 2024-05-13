import { useParams, useNavigate } from "react-router-dom";
import TextField from "./TextField";
import AddBtn from "./AddBtn";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";

const EditBlog = () => {
  const validates = yup.object().shape({
    blog_title: yup
      .string()
      .required("Title Is Required")
      .max(120, "Must be 120 or less letters ")
      .min(10),
    blog_content: yup
      .string()
      .required("Content Is Required")
      .max(520, "Must be 500 or less letters ")
      .min(10),
  });
  const navigate = useNavigate();

  const { id } = useParams();
  const [blogData, setBlogData] = useState({
    blog_title: "",
    blog_content: "",
  });
  const [image, setImage] = useState({ blog_img: null });


  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/blogs/getBlogById/${id}`)
      .then((response) => {
        console.log("Response data:", response.data);
        setBlogData({
          blog_title: response.data.blog_title,
          blog_content: response.data.blog_content, 
        });
      })
      .then((error) => {
        console.error(error);
      });
  }, [id, setBlogData]);


  const onImageUpdate = (e) => {
    setImage(e.target.files[0]);
  }; 

    const handleUpdateBlog = async (e) => {
    try {
      const formData = new FormData();
      formData.append("blog_img", image);
      formData.append("blog_title", e.blog_title);
      formData.append("blog_content", e.blog_content);
 
      console.log(e.blog_title);
      const response = await axios.put(
        `http://localhost:5001/api/blogs/updateBlog/${id}`,
        formData,   
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data);
      navigate("/BlogList");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-center m-5">EDIT BLOG</h1>
      <Formik
        enableReinitialize
        initialValues={{
          blog_title: blogData.blog_title,
          blog_content: blogData.blog_content,
        }}
        validationSchema={validates}
        onSubmit={handleUpdateBlog}
      >
        {() => (
          <div className="container m-5">
            <Form>
              <div className="row justify-content-center">
                <div className="form-group col-md-4 col-md-offset-5 align-center ">
              
                  <TextField label="Title: " type="text" name="blog_title" />
                  <TextField
                    label="Content: "
                    type="text"
                    name="blog_content"
                  />
                    <TextField
                    label="Image: "
                    type="file"
                    name="blog_img"
                    onChange={onImageUpdate}
                  />
                
                  <div>
                    <AddBtn
                      value={"updateBlog"}
                      name="UpdateBlog"
                      style={{
                        marginLeft: "64px",
                        marginTop: "20px",
                        backgroundColor: "#1070ef",
                        color: "white",
                        width: "99px",
                      }}
                      type="submit"
                    >
                      {" "}
                      Edit Blog
                    </AddBtn>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default EditBlog;

// socket.io multer jwt cors email notifications mongodb:- aggregation lookup grouping/unwind pipelines
// cors-->https://youtu.be/4KHiSt0oLJ0?si=tN_N5peIwKNkTLND
// jwt--> https://youtu.be/feETfZbvu-k?si=YuAvSrCEKWn_h_yh



//Multer

// const express = require('express');
// const multer = require('multer');
// const app = express();

// const upload =multer({
//     storage:multer.diskStorage({
//         destination:function(req,file,cb){
//             cb(null,"uploads")
//         },
//         filename:function(req,file,cb){
//             cb(null,file.fieldname+"-"+Date.now()+".jpg")
//         }
//     })
// }).single("users-file")


// app.post("/upload",upload,(req,res)=>{
//     res.send("file Uploaded")
// });

// app.listen(5000);



