import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { getTodosApi } from "../../services/getTodosApi";
import { deleteTodoApi } from "../../services/deleteTodoApi";

const useTodos = () => {
  const [todos, setTodos] = React.useState([]);

  const getTodos = async () => {
    try {
      const response = await getTodosApi();
      setTodos(response.data);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const onDeleteTodo = async (id) => {
    try {
      const response = await deleteTodoApi(id);
      if (response) {
        getTodos();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return { todos, getTodos, onDeleteTodo };
};

export default useTodos;
