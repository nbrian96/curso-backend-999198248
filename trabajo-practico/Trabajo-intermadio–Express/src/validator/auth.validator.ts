import { body } from 'express-validator';
import { validateResult } from './validate';

export const registerValidator = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isString(),
    body('email')
        .isEmail()
        .withMessage('Must provide a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6, max: 12 })
        .withMessage('Password must be between 6 and 12 characters'),
    validateResult
];

export const loginValidator = [
    body('email')
        .isEmail()
        .withMessage('Must provide a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    validateResult
];
