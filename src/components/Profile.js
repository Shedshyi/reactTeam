import React, { useEffect, useState } from 'react';
import { getActiveUser } from '../services/authService';

const Profile = () => {
  const [user, setUser] = useState(null);

  const loadUser = () => {
    const currentUser = getActiveUser();  
    if (currentUser) {
      console.log('Текущий пользователь:', currentUser);  
      setUser(currentUser);  
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
    return <p>Загрузка...</p>;  
  }

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <p>Имя пользователя: {user.username}</p>
      <p>Электронная почта: {user.email}</p>

      <h3>Привычки</h3>
      {user.habits && user.habits.length > 0 ? (
        <ul>
          {user.habits.map((habit, index) => (
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

export default Profile;
