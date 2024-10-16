import React, { useEffect, useState } from 'react';
import { List, Card, Statistic } from 'antd';
import { getAllUsers } from '../services/authService';  // Предположим, что у тебя есть такие функции

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const allUsers = getAllUsers();  // Получаем всех пользователей
    if (allUsers) {
      // Фильтруем и сортируем пользователей по количеству привычек
      const sortedUsers = allUsers.filter(user => user.habits && Array.isArray(user.habits)) // Проверяем наличие массива habits
                                  .sort((a, b) => b.habits.length - a.habits.length);  // Сортируем по убыванию
      setUsers(sortedUsers);  // Устанавливаем отсортированный список
    }
  }, []);

  if (!users.length) {
    return <p>Нет данных о пользователях.</p>;
  }

  return (
    <div>
      <h2>Таблица лидеров</h2>
      <List
        bordered
        dataSource={users}
        renderItem={(user, index) => (
          <List.Item key={index}>
            <Card
              title={user.username}
              style={{ width: 300, marginBottom: 20 }}
            >
              <Statistic title="Количество привычек" value={user.habits.length} />
              <p>Ранг: {user.habits.length >= 50 ? 'Бриллиант' :
                          user.habits.length >= 20 ? 'Золото' :
                          user.habits.length >= 10 ? 'Серебро' : 'Бронза'}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Leaderboard;
