import React, { useEffect, useState } from "react";
import { Button, Form, Input, Layout } from "antd";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { isMobile } from "react-device-detect";

const { Header, Content } = Layout;

const EditPost = () => {
  let { id } = useParams();

  const [userId, setUserID] = useState("");

  const formRef = React.useRef();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setUserID(response.data.userId);
          if (formRef && formRef.current) {
            formRef.current.setFieldsValue({
              title: response.data.title,
              body: response.data.body,
            });
          }
        }
      });
  }, []);

  const onFinish = async (values) => {
    axios(`${process.env.REACT_APP_API_BASE_URL}/posts/${id}`, {
      method: "PUT",
      data: {
        id: Number(id),
        title: values?.title,
        body: values?.body,
        userId,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) =>
      console.log(response)
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            ref={formRef}
            wrapperCol={{
              span: 16,
            }}
            style={{
              background: "#fff",
              padding: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>

            <Form.Item label="Content" name="body">
              <TextArea rows={5}/>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 12,
                span: 4,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};
export default EditPost;
