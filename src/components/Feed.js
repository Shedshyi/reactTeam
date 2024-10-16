// src/components/Feed.js
import React, { useState, useEffect } from 'react';
import { List, Card } from 'antd';

const Feed = () => {
  const [habits, setHabits] = useState([]);

  // Здесь можно подключить данные из API или мок данных
  useEffect(() => {
    const mockHabits = [
      { id: 1, title: 'Читать 20 страниц в день', description: 'Я читаю каждый день по 20 страниц' },
      { id: 2, title: 'Бегать по утрам', description: 'Каждое утро я бегаю 5 км' },
      { id: 3, title: 'Учить английский', description: 'Каждый день учу новые слова' },
    ];
    setHabits(mockHabits);
  }, []);

  return (
    <div>
      <h2>Лента привычек</h2>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={habits}
        renderItem={habit => (
          <List.Item>
            <Card title={habit.title}>
              {habit.description}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Feed;
