import { account } from "@/lib/schemas/account";

export const en = {
  firstName: {
    string: "First name is required.",
    min: `First name must be at least ${account.FIRST_NAME_MIN} characters long.`,
    max: `First name must be at most ${account.FIRST_NAME_MAX} characters long.`,
    regex: "First name must include only letters.",
  },
  lastName: {
    string: "Last name is required.",
    min: `Last name must be at least ${account.LAST_NAME_MIN} characters long.`,
    max: `Last name must be at most ${account.LAST_NAME_MAX} characters long.`,
    regex: "Last name must include only letters.",
  },
  email: {
    string: "Email is required.",
    min: `Email must be at least ${account.EMAIL_MIN} characters long.`,
    max: `Email must be at most ${account.EMAIL_MAX} characters long.`,
    email: "Please enter a valid email address.",
  },
  password: {
    string: "Password is required.",
    min: `Password must be at least ${account.PASSWORD_MIN} characters long.`,
    max: `Password must be at most ${account.PASSWORD_MAX} characters long.`,
    regex: "Password must include a number, letters, and a special character.",
  },
  passwordConfirmation: {
    string: "Password confirmation is required.",
    match: "Passwords don't match.",
  },
};
