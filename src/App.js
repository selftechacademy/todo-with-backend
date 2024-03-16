import { useState, createContext } from "react";
import { ToastContainer } from "react-toastify";
import Login from "./components/login/Login";
import TodoApp from "./containers/todoApp/TodoApp";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <ToastContainer position="top-center" autoClose={2000} />
      {isAuthenticated ? <TodoApp /> : <Login />}
    </AuthContext.Provider>
  );
}

export default App;
