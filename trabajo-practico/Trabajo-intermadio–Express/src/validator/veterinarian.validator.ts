import { body } from 'express-validator';
import { validateResult } from './validate';

export const createVeterinarianValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string')
        .trim(),
    body('lastName')
        .notEmpty()
        .withMessage('Last name is required')
        .isString()
        .withMessage('Last name must be a string')
        .trim(),
    body('medicalLicense')
        .notEmpty()
        .withMessage('Medical license is required')
        .isString()
        .withMessage('Medical license must be a string')
        .trim(),
    body('specialty')
        .notEmpty()
        .withMessage('Specialty is required')
        .isString()
        .withMessage('Specialty must be a string')
        .trim(),
    validateResult
];

export const updateVeterinarianValidator = [
    body('name')
        .optional()
        .isString()
        .withMessage('Name must be a string')
        .trim(),
    body('lastName')
        .optional()
        .isString()
        .withMessage('Last name must be a string')
        .trim(),
    body('medicalLicense')
        .optional()
        .isString()
        .withMessage('Medical license must be a string')
        .trim(),
    body('specialty')
        .optional()
        .isString()
        .withMessage('Specialty must be a string')
        .trim(),
    validateResult
];
