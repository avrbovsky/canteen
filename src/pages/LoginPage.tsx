import { useContext, useState } from "react";
import { Input, Button, Form, FormGroup, FormFeedback } from "reactstrap";
import { url } from "../config";
import { UserContext } from "../contexts/UserContext";
import { user } from "../types";

export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setCurrentUser } = useContext(UserContext);

  const handleLogin = () => {
    fetch(`${url}/api/login`, {
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
        if (response.ok) {
          fetch(`${url}/api/user/${username}`)
            .then((response) => response.json())
            .then((result: user) => {
              setCurrentUser(result);
            })
            .catch((error) => console.log("error", error));
        }
      })
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
