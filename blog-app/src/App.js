import SignupForm from "./Components/SignupForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import BlogList from "./Components/BlogList";
import Blogs from "./Components/Blogs";
import AddBlog from "./Components/AddBlog";
import EditBlog from "./Components/EditBlog";
import Error from "./Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm />}></Route>
        <Route path="/LoginForm" element={<LoginForm />}></Route>
        <Route path="/blogList" element={<BlogList />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/AddBlog" element={<AddBlog />}></Route>
        <Route path="/updateBlog/:id" element={<EditBlog />}></Route>
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
