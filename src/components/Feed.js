import React, { useEffect, useState } from 'react';
import { List, Avatar, Card, Typography } from 'antd';
import { getAllUsers } from '../services/authService';
import './Feed.css';

const { Title, Text } = Typography;

const Feed = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersData = getAllUsers();
    setUsers(usersData);
  }, []);

  return (
    <div className="feed-container">
      <Title level={2}>Лента пользователей</Title>
      {users.length === 0 ? (
        <p>Нет пользователей для отображения.</p>
      ) : (
        <List
          itemLayout="vertical"
          dataSource={users}
          renderItem={(user) => (
            <List.Item key={user.username}>
              <Card
                hoverable
                cover={
                  <Avatar size={64} style={{ backgroundColor: '#87d068' }}>
                    {user.username[0]}
                  </Avatar>
                }
              >
                <List.Item.Meta
                  title={<Text strong>{user.username}</Text>}
                  description={
                    <div>
                      <strong>Привычки:</strong>
                      <ul>
                        {user.habits && user.habits.length > 0 ? (
                          user.habits.map((habit, index) => (
                            <li key={index}>
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
