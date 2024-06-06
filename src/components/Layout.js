import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout as AntLayout, Menu, notification } from 'antd';
import '../css/Layout.css';
import icon from '../assets/images/tooth-icon.png';
import { AuthContext } from '../helpers/AuthContext';

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children }) => {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('accessToken');
      setAuthState(false);
      navigate('/login');
      notification.success({
        message: 'Success',
        description: 'Logged out successfully',
      });
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return (
    <AntLayout className="layout">
      <Header className="header">
        <div className="logo">
          <img src={icon} alt="Logo" />
        </div>
        <Menu theme="dark" mode="horizontal" className="navbar">
          {!authState ? (
            <>
              <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
              <Menu.Item key="services"><Link to="/services">Services</Link></Menu.Item>
              <Menu.Item key="login"><Link to="/login">Login</Link></Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="dashboard"><Link to="/dashboard">Dashboard</Link></Menu.Item>
              <Menu.Item key="services"><Link to="/services">Services</Link></Menu.Item>
              <Menu.Item key="profile"><Link to="/profile">Profile</Link></Menu.Item>
              <Menu.Item key="logout" onClick={handleLogout}>Logout</Menu.Item>
            </>
          )}
        </Menu>
      </Header>
      <Content className="content">
        {children}
      </Content>
      <Footer className="footer">
        <div className="footer-content">
          ©2024 RVT Dental Clinic. All rights reserved.
        </div>
      </Footer>
    </AntLayout>
  );
};

export default Layout;
