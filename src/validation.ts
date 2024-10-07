import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const LoginSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, 'Please enter your email address.').email('The email address is badly formatted.').trim(),
    password: z
      .string()
      .min(1, 'Please enter your password.')
      .min(6, 'Your password must have <strong>6</strong> characters or more.'),
  })
)

export const RegisterSchema = toTypedSchema(
  z.object({
    username: z.string().trim().min(1, 'Please enter your username.'),
    email: z
      .string({ message: 'Please enter your email address.' })
      .min(1, 'Please enter your email address.')
      .email('The email address is badly formatted.')
      .trim(),
    password: z
      .string()
      .min(1, 'Please enter your password.')
      .min(6, 'Your password must have <strong>6</strong> characters or more.'),
  })
)

export const CreateGroupSchema = toTypedSchema(
  z.object({
    new: z
      .string({ message: 'Field is required' })
      .min(1, 'Field is required')
      .max(20, 'Maximum length - 20 characters')
      .trim()
      .refine((val) => {
        const regex = /^[^.#$[\]]*$/
        return regex.test(val)
      }, 'Input cannot contain ".", "#", "$", "[", or "]".'),
  })
)

export const RenameGroupSchema = toTypedSchema(
  z.object({
    new: z
      .string({ message: 'Field is required' })
      .min(1, 'Field is required')
      .max(20, 'Maximum length - 20 characters')
      .trim()
      .refine((val) => {
        const regex = /^[^.#$[\]]*$/
        return regex.test(val)
      }, 'Input cannot contain ".", "#", "$", "[", or "]".'),
  })
)

export const CreateTaskSchema = toTypedSchema(
  z.object({
    task: z
      .string({ message: 'Field is required' })
      .min(1, 'Field is required')
      .max(120, 'Maximum length - 120 characters'),
  })
)

export const EditTaskSchema = toTypedSchema(
  z.object({
    editTask: z
      .string({ message: 'Field is required' })
      .min(1, 'Field is required')
      .max(120, 'Maximum length - 120 characters')
      .trim(),
  })
)
