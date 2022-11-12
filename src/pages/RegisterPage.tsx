import React, { useState, useEffect, ReactElement } from "react";
import { Input, Button, Form } from "reactstrap";
import { url } from "../config";

export const RegisterPage = () => {

  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [match, setMatch] = useState(false);
  const [requiredLength, setRequiredLength] = useState(8);

  useEffect(() => {
    setValidLength(
        input.password.length >= requiredLength ? true : false
    );
    setUpperCase(
        input.password.toLowerCase() !== input.password
    );
    setLowerCase(
        input.password.toUpperCase() !== input.password
    );
    setHasNumber(/\d/.test(input.password));
    setMatch(
      !!input.password &&
      input.password === input.confirmPassword
    );
    setSpecialChar(
      /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(input.password)
    );
  }, [input.password, requiredLength]);

  const handleRegister = () => {
    fetch(`${url}/register`, {
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
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
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
      <h3>Register</h3>
      <span>
        The password must have at least 8 characters. It must contain numbers,
        upper and lower case letters and special characters. The password must
        not be easy to guess.
      </span>
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
          onBlur={e => {validateInput}}
          required></Input>
        {error.password && <span className='err'>{error.password}</span>}

        <Input
          type="password"
          name="confirmPassword"
          placeholder='Enter Confirm Password'
          value={input.confirmPassword}
          onChange={onInputChange}
          onBlur={validateInput}
          required></Input>
        {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}

        <br />
      <span>
        {validLength ? <span></span> : <span>Password has not valid length.</span>} 
      </span>
      <br />
      <span>
        {hasNumber ? <span></span> : <span>Password has not numbers</span>} 
      </span>
      <br />
      <span>
    {upperCase ? <span></span> : <span>Password has not uppercase letters.</span>}
      </span>
      <br />
      <span>
        {lowerCase ? <span></span> : <span>Password has not lowercase letters.</span>}
      </span>
      <br/>
      <span>
        {specialChar ? <span></span> : <span>Password has not special characters.</span>}
      </span>
      <br />
        
        <Button onClick={handleRegister}>Submit</Button>
    </div>
  );
}