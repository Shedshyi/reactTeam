import React, { useEffect, useState } from 'react';
import { Card, List, Typography } from 'antd';
import { getActiveUser } from '../services/authService';
import './Profile.css'; 
import { Link } from 'react-router-dom';


const { Title, Text } = Typography;

const Profile = () => {
  const [user, setUser] = useState(null);

  const loadUser = () => {
    const currentUser = getActiveUser();
    if (currentUser) {
      console.log('Текущий пользователь:', currentUser);  
      setUser(currentUser);  
    } else {
      console.log('Текущий пользователь не найден');
    }
  };

  useEffect(() => {
    loadUser();

    const handleStorageChange = () => {
      console.log('Изменения в localStorage');
      loadUser(); 
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (!user) {
    return (
      <div>
        <p>Войдите в свой аккаунт</p>
        <Link to="/login">Перейти на страницу логина</Link>
      </div>
    );
  }

  return (
    <div className="profile-card-container">
      <Title level={2} className="profile-title">Профиль пользователя</Title>
      <Card style={{ marginBottom: '20px' }}>
        <Text strong>Имя пользователя: </Text>
        <Text>{user.username}</Text>
        <br />
        <Text strong>Электронная почта: </Text>
        <Text>{user.email}</Text>
      </Card>

      <Title level={3}>Привычки</Title>
      {user.habits && user.habits.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={user.habits}
          renderItem={(habit, index) => (
            <List.Item key={index}>
              <Card
                className="profile-card" 
                title={<Text strong>{habit.title}</Text>}
                bordered={false}
              >
                <Text>{habit.description}</Text>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <p>Нет привычек</p>
      )}
    </div>
  );
};

export default Profile;
