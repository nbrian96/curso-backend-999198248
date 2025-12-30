import { users, User } from '../models/users.model';

// Devuelve todos los usuarios
export const getUsers = (): User[] => {
  return users;
};

// Crea un nuevo usuario
export const createUser = (user: User): User => {
  users.push(user);
  return user;
};
