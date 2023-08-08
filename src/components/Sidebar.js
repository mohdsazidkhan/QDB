import React, { useEffect, useState } from "react";
import {
  UnorderedListOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {isMobile} from 'react-device-detect';

const { Sider } = Layout;
function Sidebar() {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState(
    localStorage.getItem("selectedKeys") || ['blogs']
  );
  const [openedKeys, setOpenKeys] = useState([]);
  const [user, setUser] = useState(null);

  const handleClick = (e) => {
    setSelectedKeys(e.key);
    localStorage.setItem("selectedKeys", [e.key]);
    if (e.key === "dashboard") {
      navigate(`/`);
    } else if (e.key === "blogs") {
      navigate(`/blogs`);
    }
  };
  const onOpenChange = (e) => {
    setOpenKeys(e.key);
    if (e.key === "dashboard") {
      navigate(`/`);
    } else if (e.key === "blogs") {
      navigate(`/blogs`);
    }
  };

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  const rndNumber = randomNumber(1, 10)

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${rndNumber}`).then(response=>{
      if(response.status === 200){
        setUser(response.data);
      }
    })
  },[])
  return (
    <Sider
      collapsed={isMobile ? true : false}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: "#fff",
        boxShadow: 'rgba(0, 0, 0, 0.2) 1px 0 10px 0'
      }}
    >
      <div className="flex items-center justify-center bg-[#fff] py-4 flex-col">
        <div>
          <Avatar
            className="flex items-center justify-center"
            size={64}
            icon={<UserOutlined />}
          />
        </div>
        <div className={`mt-3 flex justify-center items-center flex-col ${isMobile ? 'text-center' : ''}`}>
          <div className="text-gray-400">Hello</div>
          <div className="text-black font-semibold text-base capitalize">{user !==null ? user?.name : 'Jhon Doe'}</div>
        </div>
      </div>
      <Menu
        className="pt-3 bg-[#fff]"
        theme="light"
        mode="inline"
        onClick={handleClick}
        selectedKeys={selectedKeys}
        openKeys={openedKeys}
        onOpenChange={onOpenChange}
        items={[
          {
            key: "dashboard",
            icon: <HomeOutlined />,
            label: "Dashboard",
            url: "/",
          },
          {
            key: "blogs",
            icon: <UnorderedListOutlined />,
            label: "Blogs",
            url: "/blogs",
          },
        ]}
      />
    </Sider>
  );
}
export default Sidebar;
