import { useState, useEffect, useContext } from "react";
import { Input, Button, Form, FormGroup, FormFeedback } from "reactstrap";
import { url } from "../config";
import { UserContext } from "../contexts/UserContext";
import { user } from "../types";
import { checkCompromisedPassword } from "./utils";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [leakedPassword, setLeakePassword] = useState<boolean>(false);
  const requiredLength = 8;
  const { setCurrentUser, currentUser } = useContext(UserContext);
  const [signingUp, setSigningUp] = useState<boolean>(false);
  const navigate = useNavigate();

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
    setSigningUp(true);
    fetch(`${url}/api/registration`, {
      method: "POST",
      body: JSON.stringify({
        login: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response)
      .then((result) => {
        fetch(`${url}/api/user/${username}`)
          .then((response) => response.json())
          .then((result: user) => {
            setCurrentUser(result);
            navigate("/check_messages");
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error))
      .finally(() => setSigningUp(false));
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
          />
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
          />
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
          />
          <FormFeedback>Passwords must match</FormFeedback>
        </FormGroup>
        <Button
          onClick={handleRegister}
          disabled={
            invalidPassword ||
            password !== confirmPassword ||
            leakedPassword ||
            !password ||
            !username ||
            signingUp
          }
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
