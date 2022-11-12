import React, { useState, useEffect, ReactElement } from "react";
import { Input, Button, Form } from "reactstrap";
import { url } from "../config";

export const LoginPage = () => {

  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState({
    username: '',
    password: '',
  })

  const handleLogin = () => {
    fetch(`${url}/login`, {
      method: 'POST',
      body: JSON.stringify({
        "username": input.username,
        "password": input.password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response => response.json())
    .then(result => {
    })
    .catch(error => console.log('error', error));
}

  const onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    const { name, value } = event.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(event);
  }

  const validateInput: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    let { name, value } = event.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  }
  

  return (
    
    <div
      style={{
        width: "80%",
        backgroundColor: "gray",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h3>Login</h3>

      <Form>
        <Input
          type="text"
          name="username"
          placeholder='Enter Username'
          value={input.username}
          onChange={onInputChange}
          onBlur={validateInput}
          required></Input>
        {error.username && <span className='err'>{error.username}</span>}

        <Input
          type="password"
          name="password"
          placeholder='Enter Password'
          value={input.password}
          onChange={onInputChange}
          onBlur={validateInput}
          required></Input>
        {error.password && <span className='err'>{error.password}</span>}
        <br/>
        <Button nClick={handleLogin}>Submit</Button>
      </Form>
    </div>
  );
}