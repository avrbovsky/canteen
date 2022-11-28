import React, { useReducer, useState } from "react";
import { Button, Form, Input, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { url } from "../config";
import { FoodProps } from "../types";
import { Food } from "../components/Food";
import { useGetFoodList } from "../hooks/useGetFoodList";

const formReducer = (state: any, event: any) => {
  if (event.reset) {
    return {
      name: "",
      price: 0,
      weight: 0,
    };
  }
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export const AddMenuPage = () => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  const [date, setDate] = useState<Date>(defaultDate);
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      handleAddMenu();
      setSubmitting(false);
    }, 1000);
  };

  const handleAddMenu = () => {
    fetch(`${url}/api/foodCreate`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).catch((error) => console.log("error", error));
  };

  const [name, setName] = useState("");
  //const { foods } = useGetFoodList();
  const [foodsFiltered, setFoodsFiltered] = useState([
    { id: 0, name: "Meat", price: 10, weight: 1000 },
    { id: 1, name: "French fries", price: 10, weight: 1000 },
  ]);
  const navigate = useNavigate();

  const filter = (keyword: string): void => {
    if (keyword !== "") {
      const results = foodsFiltered.filter((food) => {
        return food.name.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoodsFiltered(results);
    } else {
      setFoodsFiltered(foodsFiltered);
      // If the text field is empty, show all foods
    }

    setName(keyword);
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
      <h1>Add Menu</h1>
      {submitting && <div>Submtting Form...</div>}
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Input
          type="date"
          name="username"
          defaultValue={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.currentTarget.value))}
          required
        ></Input>

        <Input
          type="search"
          value={name}
          onChange={(e) => {
            filter(e.target.value);
          }}
          placeholder="Filter"
        ></Input>
        <Table>
          {foodsFiltered && foodsFiltered.length > 0 ? (
            foodsFiltered.map(({ id, name, price, weight }) => (<>
              <Food id={id} name={name} price={price} weight={weight} />         <Input
              type="checkbox"
              name="topping"
              value="Paneer"
              //checked={isChecked}
              //onChange={handleOnChange}
            />
            </>
            ))
          ) : (
            <h1>No results found!</h1>
          )}
        </Table>
        <Button type="submit" disabled={submitting}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
