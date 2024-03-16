import { apiCaller } from "./apiCaller";

export const deleteTodoApi = async (id) => {
  const url = process.env.REACT_APP_BASE_URL + `/todo/${id}`;
  const params = {};
  const response = await apiCaller(url, "delete", params);
  return response;
};
