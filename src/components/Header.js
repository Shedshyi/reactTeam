import React from "react";
import { Menu, Layout } from "antd";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const { Header: AntHeader } = Layout;

const Header = () => {
  const { user, logout } = useUser();

  return (
    <AntHeader>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1"><Link to="/feed">Лента</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/profile">Профиль</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/leaderboard">Рейтинг</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/add-habit">Добавить привычку</Link></Menu.Item>
        {user ? (
          <>
            <span style={{ color: 'white', marginLeft: 'auto' }}>
              {user.username}!
            </span>
            <Menu.Item key="5" onClick={logout}>Выйти</Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="5"><Link to="/login">Войти</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/register">Регистрация</Link></Menu.Item>
          </>
        )}
      </Menu>
    </AntHeader>
  );
};

export default Header;
