import { apiCaller } from "./apiCaller";

export const signupApi = async (name, email, password) => {
  const url = process.env.REACT_APP_BASE_URL + "/auth/signup";
  const params = {
    name: name,
    email: email,
    password: password,
  };

  const response = await apiCaller(url, "post", params);
  return response;
};
