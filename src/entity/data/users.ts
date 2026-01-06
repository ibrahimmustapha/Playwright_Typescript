import { UserDetails } from "../userDetails";

export const standUser: UserDetails = {
  username: "standard_user",
  password: "secret_sauce",
};

export const unauthorizedUser: UserDetails = {
  username: "un_auth_user",
  password: "12343",
};

export const emailOnlyUser: UserDetails = {
  username: "standard_user",
  password: "",
};
