import React, { useEffect, useState } from "react";
import { Image, Layout } from "antd";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";

const { Header, Content } = Layout;

const PostDetail = () => {

  let { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setPost(response.data);
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
          {post !== null ? (
            <div className="shadow p-4 bg-white rounded">
              <Image src="/single-post.jpg" alt="Post Image" preview={false}/>

              <div className="flex flex-col">
                <div
                  className="text-xl lg:text-2xl capitalize font-semibold mb-2"
                >
                  {post?.title}
                </div>
                <p className="text-base text-slate-400">{post?.body}</p>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default PostDetail;
