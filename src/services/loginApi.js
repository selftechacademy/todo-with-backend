import { apiCaller } from "./apiCaller";

export const loginApi = async (email, password) => {
  const url = process.env.REACT_APP_BASE_URL + "/auth/login";
  const params = {
    email: email,
    password: password,
  };

  const response = await apiCaller(url, "post", params);
  return response;
};
