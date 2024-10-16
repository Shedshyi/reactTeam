import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { getActiveUser } from '../services/authService';
import withAuth from '../hoc/withAuth'; 
import withLogger from '../hoc/withLogger'; 

const Profile = () => {
  const [user, setUser] = useState(null);

  const loadUser = () => {
    const currentUser = getActiveUser();  
    if (currentUser) {
      setUser(currentUser);  
    } else {
      console.log('Текущий пользователь не найден');
    }
  };

  useEffect(() => {
    loadUser();

    const handleStorageChange = () => {
      loadUser();  
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  
  const memoizedUser = useMemo(() => user, [user]);

  const updateProfile = useCallback((newData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newData
    }));
  }, []);

  if (!memoizedUser) {
    return <p>Загрузка...</p>;  
  }

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <p>Имя пользователя: {memoizedUser.username}</p>
      <p>Электронная почта: {memoizedUser.email}</p>
      <h3>Привычки</h3>
      {memoizedUser.habits && memoizedUser.habits.length > 0 ? (
        <ul>
          {memoizedUser.habits.map((habit, index) => (
            <li key={index}>
              <strong>{habit.title}</strong>: {habit.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет привычек</p>
      )}
    </div>
  );
};

export default withAuth(withLogger(Profile));
