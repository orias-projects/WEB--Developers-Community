// validations/userValidation.js
const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'any.required': 'Username là trường bắt buộc.',
  }),

  nickname: Joi.string(),
  email: Joi.string().email().required().messages({
    'any.required': 'Email là trường bắt buộc.',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Mật khẩu là trường bắt buộc.',
  }),
});

const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': 'Username là trường bắt buộc.',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Mật khẩu là trường bắt buộc.',
    }),
});

const updateUserSchema = Joi.object({

  nickname: Joi.string().max(50), 
  email: Joi.string().email().messages({
    'string.email': 'Email không đúng định dạng.',
  }),
  bio: Joi.string().allow('', null), 
}).min(1).messages({
    'object.min': 'Bạn phải cung cấp ít nhất một trường để cập nhật.'
});

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required().messages({
        'any.required': 'Mật khẩu hiện tại là bắt buộc.',
    }),
    newPassword: Joi.string().min(6).required().messages({
        'string.min': 'Mật khẩu mới phải có ít nhất 6 ký tự.',
        'any.required': 'Mật khẩu mới là bắt buộc.',
    }),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
};