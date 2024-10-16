import React, { useState, useCallback, useMemo } from 'react';
import { Form, Input, Button, message } from 'antd';
import { addHabitToUser, getActiveUser } from '../services/authService';
import withLogger from '../hoc/withLogger';

const AddHabit = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = useCallback(() => {
    const currentUser = getActiveUser();
    if (!currentUser) {
      message.error('Пожалуйста, войдите в систему, чтобы добавить привычку.');
      return;
    }

    const newHabit = { title, description };
    addHabitToUser(currentUser, newHabit);
    message.success('Привычка успешно добавлена!');
    setTitle('');
    setDescription('');
  }, [title, description]);

  const memoizedFormValues = useMemo(() => ({
    title,
    description
  }), [title, description]);

  return (
    <div>
      <h2>Добавить новую привычку</h2>
      <Form onFinish={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Form.Item label="Название привычки">
          <Input value={memoizedFormValues.title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item label="Описание">
          <Input value={memoizedFormValues.description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Добавить</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withLogger(AddHabit);
