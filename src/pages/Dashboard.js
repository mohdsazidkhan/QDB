import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';
import { isMobile } from 'react-device-detect';

const { Header, Content } = Layout;

const Dashboard = () => {

  return (
    <Layout>
      <Sidebar/>
      <Layout
        className="site-layout"
        style={{
          marginLeft: isMobile ? 80 : 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: '#fff',
          }}
        />
        <Content
          style={{
            margin: isMobile ? 5 : 24,
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: "#fff",
            }}
          >
            <div className='text-2xl'>Dashboard</div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;