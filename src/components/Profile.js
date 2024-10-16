import React, { useEffect, useState } from 'react';
import { getActiveUser } from '../services/authService';

const Profile = () => {
  const [user, setUser] = useState(null);

  const loadUser = () => {
    const currentUser = getActiveUser();  // Получаем текущего пользователя
    if (currentUser) {
      console.log('Текущий пользователь:', currentUser);  // Логируем текущего пользователя
      setUser(currentUser);  // Если пользователь найден, сохраняем в состояние
    } else {
      console.log('Текущий пользователь не найден');
    }
  };

  useEffect(() => {
    // Загружаем данные пользователя при монтировании компонента
    loadUser();

    // Добавляем слушатель события storage для отслеживания изменений в localStorage
    const handleStorageChange = () => {
      console.log('Изменения в localStorage');
      loadUser();  // Перезагружаем пользователя, если данные изменились
    };

    window.addEventListener('storage', handleStorageChange);

    // Удаляем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);  // Пустой массив зависимостей, чтобы эффект выполнялся один раз при монтировании

  if (!user) {
    return <p>Загрузка...</p>;  // Если пользователь не загружен, показываем загрузку
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
