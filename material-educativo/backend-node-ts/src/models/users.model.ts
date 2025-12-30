// Modelo simple en memoria
export interface User {
  id: number;
  name: string;
  email: string;
}

// Simula una base de datos
export const users: User[] = [];
