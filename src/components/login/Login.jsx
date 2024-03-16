import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { loginApi } from "../../services/loginApi";
import { signupApi } from "../../services/signupApi";
import { AuthContext } from "../../App";

const defaultValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Login = () => {
  const [formValues, setFormValues] = useState(defaultValue);
  const [isLogin, setIsLogin] = useState(true);

  const { setIsAuthenticated } = useContext(AuthContext);

  const onFormValueChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    try {
      const response = await loginApi(email, password);
      if (response) {
        setIsAuthenticated(true);
        setFormValues(defaultValue);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onSignupSubmit = async (e) => {
    e.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      return toast.error("Password and Confirm Password should be same");
    }
    try {
      const { name, email, password } = formValues;
      const response = await signupApi(name, email, password);
      if (response) {
        setIsAuthenticated(true);
        setFormValues(defaultValue);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return isLogin ? (
    <Form onSubmit={onLoginSubmit}>
      <h1 className="text-center mb-4 text-primary">Please login:</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={formValues.email}
          onChange={onFormValueChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={onFormValueChange}
        />
      </Form.Group>
      <Button className="w-100" variant="primary" type="submit">
        Login
      </Button>
      <p className="text-center my-3 fw-bold fs-6">or</p>
      <Button
        className="w-100"
        variant="success"
        onClick={() => setIsLogin(false)}
      >
        Go To Sign up
      </Button>
    </Form>
  ) : (
    //FIXME: SIGNUP FORM
    <Form onSubmit={onSignupSubmit}>
      <h1 className="text-center mb-4 text-success">Please Sign Up:</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter name"
          required
          value={formValues.name}
          onChange={onFormValueChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          required
          value={formValues.email}
          onChange={onFormValueChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formValues.password}
          onChange={onFormValueChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={formValues.confirmPassword}
          onChange={onFormValueChange}
        />
      </Form.Group>

      <Button className="w-100" variant="success" type="submit">
        Sign up
      </Button>
      <p className="text-center my-3 fw-bold fs-6">or</p>
      <Button
        className="w-100"
        variant="primary"
        type="submit"
        onClick={() => setIsLogin(true)}
      >
        Go To Login
      </Button>
    </Form>
  );
};

export default Login;
