const {body} =require("express-validator");

module.exports.registrationValidation = [
    body('name').not().isEmpty().trim().escape().withMessage('Name is required'),
    body('email').isEmail().trim().normalizeEmail().escape().withMessage('Email is required'),
    body('password').isLength({min:6}).withMessage('Password should be 6 character long')
]

module.exports.loginValidation = [

    body('email').isEmail().trim().normalizeEmail().escape().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password is empty')
]