import { useState, useEffect } from "react";
import { Input, Button, Form, FormGroup, FormFeedback } from "reactstrap";
import { url } from "../config";
import { checkCompromisedPassword } from "./utils";

export const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [leakedPassword, setLeakePassword] = useState<boolean>(false);
  const requiredLength = 8;

  useEffect(() => {
    if (password) {
      const invalid =
        password.length < requiredLength ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password) ||
        !/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password);
      setInvalidPassword(invalid);

      const getData = setTimeout(() => {
        checkCompromisedPassword(password, setLeakePassword);
      }, 1500);

      return () => clearTimeout(getData);
    }
  }, [password]);

  const handleRegister = () => {
    fetch(`${url}/register`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {})
      .catch((error) => console.log("error", error));
  };

  return (
    <div
      style={{
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h3>Register</h3>
      <Form>
        <FormGroup>
          <Input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            required
            invalid={username?.length === 0}
          ></Input>
          <FormFeedback>Username must not be empty</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            invalid={invalidPassword}
          ></Input>
          <FormFeedback>
            The password must have at least 8 characters, contain numbers, upper
            and lower case letters and special characters
          </FormFeedback>
          {leakedPassword && (
            <span style={{ color: "red" }}>Password is leaked.</span>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            required
            invalid={confirmPassword !== password}
          ></Input>
          <FormFeedback>Passwords must match</FormFeedback>
        </FormGroup>
        <Button
          onClick={handleRegister}
          disabled={
            invalidPassword ||
            password !== confirmPassword ||
            leakedPassword ||
            !password ||
            !username
          }
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
