import React, { useReducer, useState } from "react";
import { Button, Form, Input, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { url } from "../config";
import { FoodProps, option } from "../types";
import { Food } from "../components/Food";
import { useGetFoodList } from "../hooks/useGetFoodList";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";

const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

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
    const keys: number[] = [];
    optionSelected?.forEach(({ value }) => keys.push(value));
    console.log(JSON.stringify({
      date:
        formData.date == undefined
          ? date.toISOString().split("T")[0]
          : formData.date,
      id: keys,
    }),)
    fetch(`${url}/api/menuCreate`, {
      method: "POST",
      body: JSON.stringify({
        date:
          formData.date == undefined
            ? date.toISOString().split("T")[0]
            : formData.date,
        id: keys,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).catch((error) => console.log("error", error));
  };

  const [name, setName] = useState("");
  const { foods } = useGetFoodList();
  const [foodsOption, setFoodsOption] = useState(foods.map(({ id, name }) => ({ value: id, label: name })))
  const [optionSelected, setOptionSelected] = useState<option[]>();

  const handleChange = (selected: any) => {
    setOptionSelected(selected);
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
          name="date"
          defaultValue={date.toISOString().split("T")[0]}
          onChange={setFormData}
          required
          disabled={submitting}
        ></Input>

        <span
          data-toggle="popover"
          data-trigger="focus"
          data-content="Please select"
        >
          <ReactSelect
            isDisabled={submitting}
            required
            options={foodsOption}
            placeholder="Add Food"
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option,
            }}
            onChange={handleChange}
            //allowSelectAll={true}
            value={optionSelected}
          />
        </span>

        <Button type="submit" disabled={submitting} onC>
          Submit
        </Button>
      </Form>
    </div>
  );
};
