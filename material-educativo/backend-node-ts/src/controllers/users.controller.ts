import { Request, Response } from 'express';
import * as userService from '../services/users.service';
import { sendWelcomeEmail } from '../services/mail.service';

export const getAllUsers = (req: Request, res: Response) => {
  try {
    const data = userService.getUsers();
    res.json(data); // por defecto es status 200
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' }); // revisar la page https://http.cat/
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const user = userService.createUser(req.body);

    if (!user) {
      throw new Error('Invalid user data');
    }

    await sendWelcomeEmail(user.email, user.name);

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Datos de usuario inválidos' });
  }
};
