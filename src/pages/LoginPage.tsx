import { useState } from "react";
import { Input, Button, Form, FormGroup, FormFeedback } from "reactstrap";
import { url } from "../config";

export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    fetch(`${url}/login`, {
      method: "POST",
      body: JSON.stringify({
        login: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if(!response.ok){
          console.log('log in')
        };
        response.json()})
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
      <h3>Login</h3>

      <Form>
        <FormGroup>
          <Input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            required
            invalid={!username}
          ></Input>
          <FormFeedback>Enter username</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            invalid={!password}
          ></Input>
          <FormFeedback>Enter Password</FormFeedback>
        </FormGroup>
        <Button onClick={handleLogin} disabled={!password || !username}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
