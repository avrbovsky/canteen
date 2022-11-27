import React, { useReducer, useState } from "react";
import { Button, Form, Input } from "reactstrap";
import { url } from "../config";

const formReducer = (state:any, event:any) => {
  if(event.reset) {
    return {
      name: '',
      price: 0,
      weight: 0,
    }
  }
  return {
    ...state,
    [event.target.name]: event.target.value
  }
 }

export const AddFood = () => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      handleAddFood();
      setSubmitting(false);
    }, 1000)
  };


  const handleAddFood = () => {
    fetch(`${url}/api/foodCreate`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .catch((error) => console.log("error", error))
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
      <h1>Add Food</h1>
      {submitting &&
       <div>Submtting Form...</div>
     }
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Input required disabled={submitting} name="name" type="text" placeholder="Name" maxlength="100" onChange={setFormData}>
          Name
        </Input>
        <Input required disabled={submitting} name="price" type="number" placeholder="Price" step="0.01" min="0" onChange={setFormData}>
          Price
        </Input>
        <Input required disabled={submitting} name="weight" type="number" placeholder="Weight" step="1" min="0" onChange={setFormData}>
          Weight
        </Input>
        <Button type="submit" disabled={submitting}>Submit</Button>
      </Form>
    </div>
  );
};
