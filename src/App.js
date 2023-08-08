import React from "react";
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Blogs from './pages/Blogs';
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";

export default function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="/blogs" element={<Blogs/>}/>
          <Route exact path="/posts/:id" element={<PostDetail/>}/>
          <Route exact path="/edit-posts/:id" element={<EditPost/>}/>
        </Routes>
    </Router>
  );
}
