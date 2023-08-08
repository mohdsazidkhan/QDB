import React, { useEffect, useState } from "react";
import { Button, Col, Image, Layout, Row } from "antd";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

const { Header, Content } = Layout;

const Blogs = () => {

  const [posts, setPosts] = useState([]);

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const rndNumber = randomNumber(1, 10);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/users/${rndNumber}/posts`)
      .then((response) => {
        if (response.status === 200) {
          setPosts(response.data);
        }
      });
  }, []);

  return (
    <Layout>
      <Sidebar />
      <Layout
        className="site-layout"
        style={{
          marginLeft: isMobile ? 80 : 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: "#fff",
          }}
        />
        <Content
          style={{
            margin: isMobile ? 5 : 24,
            overflow: "initial",
          }}
        >
         
            {posts?.length > 0 ? (
              posts?.map((item, index) => (
                <Row key={index} className="mb-2 shadow p-4 bg-white rounded">
                  <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={4}>
                  <Link to={`/posts/${item?.id}`}><Image src="/post.png" alt="Post Image" preview={false}/></Link>
                  </Col>
                  <Col xs={24} sm={24} md={20} lg={20} xl={20} xxl={20}>
                    <div className={`flex flex-col ${isMobile ? 'ml-0' : 'ml-4'}`}>
                      <Link to={`/posts/${item?.id}`} className="text-xl lg:text-2xl capitalize font-semibold mb-2">{item?.title}</Link>
                      <p className="text-base text-slate-400">{item?.body}</p>
                    </div>
                    <div className={`flex gap-4 ${isMobile ? 'ml-0 justify-start mt-4' : 'ml-4 justify-end mt-14'}`}>
                      <Link to={`/edit-posts/${item?.id}`}><Button className="editBtn" type="primary">Edit</Button></Link>
                      <Button className="deleteBtn" type="primary">Delete</Button>
                    </div>
                  </Col>
                </Row>
              ))
            ) : (
              <div>Loading...</div>
            )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Blogs;
