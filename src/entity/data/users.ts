import { UserDetails } from "../userDetails";

export const users = {
  standard: {
    username: "standard_user",
    password: "secret_sauce",
  },
  unauthorized: {
    username: "un_auth_user",
    password: "12343",
  },
  emailOnly: {
    username: "standard_user",
    password: "",
  },
} as const satisfies Record<string, UserDetails>;

export const standardUser = users.standard;
export const standUser = standardUser;
export const unauthorizedUser = users.unauthorized;
export const emailOnlyUser = users.emailOnly;
