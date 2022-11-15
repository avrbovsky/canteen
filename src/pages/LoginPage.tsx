import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form, FormGroup, FormFeedback } from "reactstrap";
import { url } from "../config";
import { UserContext } from "../contexts/UserContext";
import { user } from "../types";

export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    setSigningIn(true);
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
              navigate("/check_messages");
            })
            .catch((error) => console.log("error", error));
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => setSigningIn(false));
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
        <Button
          onClick={handleLogin}
          disabled={!password || !username || signingIn}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
