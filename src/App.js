import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';
import AddHabit from './components/AddHabit';
import Register from './components/Register';
import { UserProvider, useUser } from './components/UserContext';

const { Header, Content, Footer } = Layout;

const AppContent = () => {
  const { user, logout } = useUser();

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/feed">Лента</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/profile">Профиль</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/leaderboard">Рейтинг</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/add-habit">Добавить привычку</Link></Menu.Item>
          {user ? (
            <>
              <span style={{ color: 'white', marginLeft: 'auto' }}>Привет, {user.username}!</span>
              <Menu.Item key="5" onClick={logout}>Выйти</Menu.Item>
            </>
          ) : (
            <Menu.Item key="5"><Link to="/login">Войти</Link></Menu.Item>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          <Routes>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/add-habit" element={<AddHabit />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Habit Tracker ©2024</Footer>
    </Layout>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

export default App;
