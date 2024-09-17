import { z as zod } from 'zod';

// Define reusable username and password rules
const usernameValidation = zod
  .string({ required_error: "Username is required" })
  .min(4, "Username must be at least 4 characters")
  .max(20, "Username must be no more than 20 characters");

const passwordValidation = zod
  .string({ required_error: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password must be no more than 20 characters")
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
    "Password should be a combination of one uppercase, one lowercase, one special char, one digit, and min 8, max 20 characters long"
  );

// Use the validation rules in your schemas
export const logInSchema = zod.object({
  username: usernameValidation,
  password: passwordValidation,
});

export const usernameSchema = zod.object({
  username: usernameValidation,
});

export const passwordSchema = zod.object({
  password: passwordValidation,
});

export default logInSchema;