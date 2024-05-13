import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import AddBtn from "./AddBtn";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useEffect, useState } from "react";
import api from "../config";
import axios from "axios";

const BlogList = () => {
  const [blogData, setBlogData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getBlog();
  }, []);

  const token = JSON.parse(localStorage.getItem("login"));

  const getBlog = async () => {
    try {
      const response = await 
      api.get("http://localhost:5001/api/blogs/blogList");
      setBlogData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveBlog = async () => {
    try {
      await api.delete(`http://localhost:5001/api/blogs/deleteBlog/${selectedId}`);
      getBlog();
    } catch (error) {
      console.error(error);
    }
  };

  const setSelectedBlogId = (id) => {
    setSelectedId(id);
  };

  const renderBlogs = () =>
    blogData.map((blog) => (
      <div key={blog._id}>
        <div className="card m-2" style={{ width: "20rem" }}>
          <div className="card-body">
            <h5 className="card-img">
              <img src={`http://localhost:5001/uploads/${blog.blog_img}`} alt="BlogImg"/>{" "}
            </h5>
            <h5 className="card-title">{blog.blog_title}</h5>
            <p className="card-text">{blog.blog_content}</p>
            <Link
              to={`/updateBlog/${blog._id}`}
              style={{ margin: "15px", color: "green", fontSize: "20px" }}
            >
              <CiEdit />
            </Link>
            <Link
              style={{ color: "red", fontSize: "20px" }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => setSelectedBlogId(blog._id)}
            >
              <AiOutlineDelete />
            </Link>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <div className="justify-content-between m-5">
        <div className="row">
          <div className="col-10">
            {/* <h3 className="">Welcome {token.name.toUpperCase()}</h3> */}
          </div>
          <div className="col-2">
            <Link to="/LoginForm">
              <LogoutBtn />
            </Link>
          </div>
        </div>
      </div>
      <h1 style={{ color: "black" }} className="text-center m-3">
        Blogs
      </h1>{" "}
      <Link to="/AddBlog">
        <AddBtn
          style={{
            marginLeft: "145px",
            backgroundColor: "#1f813a",
            color: "white",
            marginTop: "15px",
          }}
        >
          {" "}
          Add Blog
        </AddBtn>
      </Link>
      <div className="text-center d-flex flex-wrap m-3 p-3 justify-content-center">
        {blogData && blogData.length > 0 ? (
          renderBlogs()
        ) : (
          <p>No Blogs</p>
        )}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Blog
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this blog?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleRemoveBlog}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;
