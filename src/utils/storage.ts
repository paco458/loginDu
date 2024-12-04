import { User } from '../types/auth';

const USERS_KEY = 'auth_users';

export const saveUser = (user: User) => {
  try {
    let users: User[] = [];
    const storedUsers = localStorage.getItem(USERS_KEY);
    
    if (storedUsers) {
      users = JSON.parse(storedUsers);
    }
    
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving user:', error);
    throw new Error('Error al guardar el usuario');
  }
};

export const updateUser = (updatedUser: User) => {
  try {
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (storedUsers) {
      let users: User[] = JSON.parse(storedUsers);
      const index = users.findIndex(u => 
        u.phoneNumber === updatedUser.phoneNumber || 
        (u.email && u.email === updatedUser.email)
      );
      
      if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Error al actualizar el usuario');
  }
};

export const findUser = (identifier: string): User | undefined => {
  try {
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (storedUsers) {
      const users: User[] = JSON.parse(storedUsers);
      return users.find(user => 
        user.email === identifier || 
        user.phoneNumber === identifier ||
        user.firstName === identifier
      );
    }
    return undefined;
  } catch (error) {
    console.error('Error finding user:', error);
    return undefined;
  }
};