import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../config";

const Blogs = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const token = JSON.parse(localStorage.getItem("login"));

  const getData = async () => {
    try {
      const response = await api.get("http://localhost:5001/api/blogs/blogList", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      setBlogData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderBlogs = () =>
    blogData.map((blog) => (
      <div>
        <div className="card m-2" style={{ width: "20rem" }}>
          <div className="card-body">
            <h5 className="card-img">
              <img src={`http://localhost:5001/uploads/${blog.blog_img}`} />{" "}
            </h5>
            <h5 className="card-title">{blog.blog_title}</h5>
            <p className="card-text">{blog.blog_content}</p>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <div className="justify-content-between m-5">
        <div className="row ">
          <div className="col-10">
            <h3 className="">Welcome {token.name.toUpperCase()}</h3>
          </div>
          <div className="col-2">
            <Link to="/LoginForm">
              <LogoutBtn />
            </Link>
          </div>
        </div>
      </div>
      <h1 style={{ color: "black" }} className="text-center m-5">
        Blogs
      </h1>{" "}
      <div className="text-center d-flex flex-wrap m-3 p-3 justify-content-center">
        {/* {data !== "" && data !== null && data !== undefined
          ? renderBlogs()
          : "No Blogs"} */}
        {renderBlogs()}
      </div>
    </>
  );
};

export default Blogs;
