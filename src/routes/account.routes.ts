import data from "@/lib/stubs/users";
import { User } from "@/interfaces/user";

export const signInRequest = async (values: {
  email: string;
  password: string;
}): Promise<User | null> => {
  const user = await new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      if (
        values.email === data.user.email &&
        values.password === data.user.password
      ) {
        resolve(data.user);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
  return user;
};

export const signUpRequest = async (values: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<User | null> => {
  const user = await new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      if (values.email === data.user.email) {
        reject(new Error("Email already in use"));
      } else {
        resolve(data.user);
      }
    }, 1000);
  });
  return user;
};
