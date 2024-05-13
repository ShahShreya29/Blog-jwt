import TextField from "./TextField";
import AddBtn from "./AddBtn";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";

const AddBlog = () => {
  const validationSchema = yup.object().shape({
    blog_title: yup
      .string()
      .required("Title is required")
      .max(120, "Title must be 120 characters or less")
      .min(10, "Title must be at least 10 characters long"),
    blog_content: yup
      .string()
      .required("Content is required")
      .max(520, "Content must be 520 characters or less")
      .min(10, "Content must be at least 10 characters long"),
    // blog_img: yup.mixed().required("Image is required"),
  });

  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleAddBlog = async (values) => {
    try {
      const formData = new FormData();
      formData.append("blog_img", image);
      formData.append("blog_title", values.blog_title);
      formData.append("blog_content", values.blog_content);

      const response = await axios.post(
        "http://localhost:5001/api/blogs/addBlog",
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

  const onImageUpdate = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <h1 className="text-center m-5">ADD BLOG</h1>
      <Formik
        initialValues={{
          blog_title: "",
          blog_content: "",
          blog_img: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleAddBlog}
      >
        <Form>
          <div className="container m-5">
            <div className="row justify-content-center">
              <div className="form-group col-md-4 col-md-offset-5 align-center">
                <TextField label="Title: " type="text" name="blog_title" />
                <ErrorMessage name="blog_title" component="div" className="text-danger" />
                <TextField label="Content: " type="text" name="blog_content" />
                <ErrorMessage name="blog_content" component="div" className="text-danger" />
                <Field
                  type="file"
                  name="blog_img"
                  onChange={onImageUpdate}
                  className="form-control"
                />
                <ErrorMessage name="blog_img" component="div" className="text-danger" />
                <div>
                  <AddBtn
                    type="submit"
                    style={{
                      marginLeft: "64px",
                      marginTop: "20px",
                      backgroundColor: "#1070ef",
                      color: "white",
                      width: "99px",
                    }}
                  >
                    Add Blog
                  </AddBtn>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default AddBlog;
