import SignupForm from "./LayOuts/SignupForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LayOuts/LoginForm";
import BlogList from "./LayOuts/BlogList";
import Blogs from "./LayOuts/Blogs";
import AddBlog from "./LayOuts/AddBlog";
import EditBlog from "./LayOuts/EditBlog";
import Error from "./Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm />}></Route>
        <Route path="/LoginForm" element={<LoginForm />}></Route>
        <Route path="/blogList" element={<BlogList />}></Route>
        <Route path="/getBlogById/:id" element={<BlogList />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/AddBlog" element={<AddBlog />}></Route>
        <Route path="/updateBlog/:id" element={<EditBlog />}></Route>
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
