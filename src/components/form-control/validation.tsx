import * as yup from 'yup'
import { ObjectShape } from 'yup/lib/object'
import { str } from '../../utils'

yup.setLocale({
  mixed: {
    required: 'Поле не заполнено',
    default: 'Поле заполнено неверно',
    notType: 'Неверный тип данных',
  },

  string: {
    email: str.normalize('Указан некорректный e-mail') as string,
    min: ({ min }) => `Минимальная длина поля ${min} символов`,
    max: ({ max }) => `Максимальная длина поля ${max} символов`,
    matches: 'Поле заполнено неверно',
    length: ({ length }) => `Должно быть ровно ${length} символов`,
  },

  number: {
    min: ({ min }) => `Минимальное число: ${min}`,
    max: ({ max }) => `Максимальное число: ${max}`,
    lessThan: ({ less }) => `Число должно быть меньше чем ${less}`,
    moreThan: ({ more }) => `Число должно быть больше чем ${more}`,
    positive: 'Ожидается положительное число',
    negative: 'Ожидается отрицательное число',
  },

  date: {
    min: ({ min }) => `Минимальная дата в акции ${min}`,
    max: ({ max }) => `Максимальная дата в акции ${max}`,
  },
})

export const validation = (s: ObjectShape) => yup.object().shape(s)
