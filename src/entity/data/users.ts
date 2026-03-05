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
  lockedOutUser: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
  problemUser: {
    username: "problem_user",
    password: "secret_sauce",
  },
  performanceGlitchUser: {
    username: "performance_glitch_user",
    password: "secret_sauce",
  },
} as const satisfies Record<string, UserDetails>;

export const standardUser = users.standard;
export const standUser = standardUser;
export const unauthorizedUser = users.unauthorized;
export const emailOnlyUser = users.emailOnly;
export const lockedOutUser = users.lockedOutUser;
export const problemUser = users.problemUser;
export const performanceGlitchUser = users.performanceGlitchUser;
