import React, { useState, useEffect } from "react";
import SimpleNavbar from "../../components/navbar/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { getTodosApi } from "../../services/getTodosApi";
import { addTodoApi } from "../../services/addTodoApi";
import { deleteTodoApi } from "../../services/deleteTodoApi";
import { toast } from "react-toastify";
import useTodos from "./useTodos";

const TodoApp = () => {
  const [todo, setTodo] = useState("");
  // const { todos, getTodos, onDeleteTodo } = useTodos();

  const [todos, setTodos] = useState([]);

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

  //we add todo
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addTodoApi(todo, false);
      if (response) {
        getTodos();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setTodo("");
  };

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

  return (
    <div>
      <SimpleNavbar />
      <Container className="mt-5">
        <h1>Todo App</h1>
        <div>
          <Form
            className="d-flex align-items-center gap-2"
            onSubmit={onFormSubmit}
          >
            <div className="flex-grow-1">
              <Form.Label htmlFor="inputPassword5"></Form.Label>
              <Form.Control
                type="text"
                value={todo}
                required
                onChange={(e) => setTodo(e.target.value)}
              />
              <Form.Text muted>Please enter your important work</Form.Text>
            </div>
            <div className="w-25">
              <Button className="w-75" variant="primary" type="submit">
                Add
              </Button>
            </div>
          </Form>
        </div>
        <div>
          <ListGroup numbered>
            {todos.map((todo, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between "
              >
                <span>{todo.todo}</span>
                <Button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDeleteTodo(todo.id)}
                >
                  X
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Container>
    </div>
  );
};

export default TodoApp;
