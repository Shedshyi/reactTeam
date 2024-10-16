import React, { useEffect, useState } from 'react';
import { List, Avatar, Card, Typography } from 'antd';
import { getAllUsers } from '../services/authService';
import './Feed.css'; // Подключаем CSS для ленты

const { Title, Text } = Typography;

const Feed = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersData = getAllUsers();
    setUsers(usersData);
  }, []);

  return (
    <div className="feed-container">
      <Title level={2} className="feed-title">Лента пользователей</Title>
      {users.length === 0 ? (
        <p>Нет пользователей для отображения.</p>
      ) : (
        <List
          itemLayout="vertical"
          dataSource={users}
          renderItem={(user) => (
            <List.Item
              key={user.username}
              className="feed-item"
            >
              <Card
                className="feed-card"
                hoverable
                cover={<Avatar size={64} style={{ backgroundColor: '#87d068' }}>{user.username[0]}</Avatar>}
              >
                <List.Item.Meta
                  title={<Text strong className="feed-username">{user.username}</Text>}
                  description={
                    <div className="feed-description">
                      <strong>Привычки:</strong>
                      <ul>
                        {user.habits && user.habits.length > 0 ? (
                          user.habits.map((habit, index) => (
                            <li key={index} className="feed-habit-item">
                              <Text>{habit.title}: {habit.description}</Text>
                            </li>
                          ))
                        ) : (
                          <li>Нет привычек</li>
                        )}
                      </ul>
                    </div>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Feed;
