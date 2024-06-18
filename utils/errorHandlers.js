import { validationResult } from 'express-validator';


export const registerValidation = (req) => {
    const errors = validationResult(req);
    return errors.array().map((item) => ({
        msg: item.msg,
        field: item.path,
    }));
};

export const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";

    // Check if the error is a validation error
    if (err.name === 'ValidationError') {
        statusCode = 422; // Unprocessable Entity
        message = "Validation Error";
    }

    // Check if the error is a permission error
    if (err.name === 'PermissionError') {
        statusCode = 403; // Forbidden
        message = "Permission Denied";
    }

    // Check if the error is a not found error
    if (err.name === 'NotFoundError') {
        statusCode = 404; // Not Found
        message = "Resource Not Found";
    }

    // Check for other specific error types and handle accordingly...

    console.error(`Error handled: ${statusCode} - ${message}`);
    displayError(req, res, statusCode, message);
};

const displayError = (req, res, statusCode, message) => {
    console.log(`Error ${statusCode}: ${message}`);
    res.status(statusCode).render("errorHandler", {
        title: "Error",
        path: req.path,
        metaDescription: "An error occurred",
        statusCode,
        message,
    });
};
