import { apiCaller } from "./apiCaller";

export const addTodoApi = async (todo, isCompleted) => {
  const url = process.env.REACT_APP_BASE_URL + "/todo";
  const params = {
    todo: todo,
    isCompleted: isCompleted,
  };
  const response = await apiCaller(url, "post", params);
  return response;
};
