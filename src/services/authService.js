// Мок-данные для пользователей
const getUsersFromLocalStorage = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];  // Если нет данных, возвращаем пустой массив
  };
  
  const saveUsersToLocalStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };
  
  // Получить всех пользователей
  export const getAllUsers = () => {
    return getUsersFromLocalStorage();
  };
  
  // Добавить нового пользователя
  export const registerUser = (userData) => {
    const users = getUsersFromLocalStorage();
    const existingUser = users.find((user) => user.email === userData.email);
    if (existingUser) {
      return null;  // Уже существует пользователь с таким email
    }
    users.push(userData);
    saveUsersToLocalStorage(users);  // Сохраняем данные в localStorage
    return userData;
  };
  
  // Логин пользователя
  export const loginUser = (email, password) => {
    const users = getUsersFromLocalStorage();
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('activeUser', JSON.stringify(user)); // Сохраняем активного пользователя
      return user;  // Возвращает объект пользователя
    }
    return null;  // Неверные данные
  };
  
  // Получить активного пользователя
  export const getActiveUser = () => {
    const activeUser = localStorage.getItem('activeUser');
    return activeUser ? JSON.parse(activeUser) : null;
  };
  
  // Добавить привычку пользователю
  export const addHabitToUser = (currentUser, newHabit) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Найдём пользователя по имени
    const userIndex = users.findIndex(user => user.username === currentUser.username);
  
    if (userIndex !== -1) {
      // Добавляем новую привычку в массив habits
      users[userIndex].habits = [...users[userIndex].habits, newHabit];
  
      // Обновляем в localStorage
      localStorage.setItem('users', JSON.stringify(users));
  
      // Также обновляем activeUser, чтобы данные были актуальны
      localStorage.setItem('activeUser', JSON.stringify(users[userIndex]));
    } else {
      console.error("Пользователь не найден");
    }
  };
  