import Joi from 'joi';

export const createSubscriptionSchema = Joi.object({
  clientId: Joi.string()
    .min(8)
    .max(8)
    .pattern(/^CL\d{6}$/)
    .message('clientId має бути у форматі CLXXXXXX')
    .required(),
  name: Joi.string()
    .min(2)
    .max(35)
    .pattern(/^[А-Яа-яЁёІіЇїЄєҐґA-Za-z]+ [А-Яа-яЁёІіЇїЄєҐґA-Za-z]+$/)
    .message('Ім’я має містити прізвище та ім’я через пробіл')
    .required(),
  phone: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .message('Телефон має бути у форматі +380XXXXXXXXX')
    .required(),
  email: Joi.string()
    .email()
    .email({ tlds: { allow: false } })
    .pattern(/@gmail\.com$/)
    .message('Email має бути @gmail.com')
    .required(),
  type: Joi.string().required(),
  timeBorder: Joi.number(),
  status: Joi.string().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date()
    .iso()
    .greater(Joi.ref('startDate'))
    .message('Дата завершення має бути пізніше за дату початку')
    .required(),
  price: Joi.number().min(0).message('Ціна не може бути відʼємною').required(),
  method: Joi.string().required(),
});

export const updateSubscriptionSchema = Joi.object({
  clientId: Joi.string().min(8).max(8),
  name: Joi.string()
    .min(2)
    .max(100)
    .pattern(/^[А-Яа-яЁёІіЇїЄєҐґA-Za-z]+ [А-Яа-яЁёІіЇїЄєҐґA-Za-z]+$/)
    .message('Ім’я має містити прізвище та ім’я через пробіл'),
  phone: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .message('Телефон має бути у форматі +380XXXXXXXXX'),
  email: Joi.string()
    .email()
    .email({ tlds: { allow: false } })
    .pattern(/@gmail\.com$/)
    .message('Email має бути @gmail.com'),
  type: Joi.string(),
  status: Joi.string(),
  startDate: Joi.date().iso(),
  endDate: Joi.date()
    .iso()
    .greater(Joi.ref('startDate'))
    .message('Дата завершення має бути пізніше за дату початку'),
  price: Joi.number().min(0).message('Ціна не може бути відʼємною'),
  method: Joi.string(),
});
