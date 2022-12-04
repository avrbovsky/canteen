import { useEffect, useReducer, useState } from "react";
import { Button, Form, Input } from "reactstrap";
import { url } from "../config";
import { useGetFoodList } from "../hooks/useGetFoodList";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import { option } from "../types";

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
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const { foods } = useGetFoodList();
  const [foodsOption, setFoodsOption] = useState<option[]>();
  const [optionSelected, setOptionSelected] = useState<option[]>();

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
    console.log(
      JSON.stringify({
        date:
          formData.date === undefined
            ? defaultDate.toISOString().split("T")[0]
            : formData.date,
          foodIds: keys,
      })
    );
    fetch(`${url}/api/menuCreate`, {
      method: "POST",
      body: JSON.stringify({
        date:
          formData.date === undefined
            ? defaultDate.toISOString().split("T")[0]
            : formData.date,
        id: keys,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (foods) {
      const foodOptions = foods.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
      setFoodsOption(foodOptions);
    }
  }, [foods]);

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
          defaultValue={defaultDate.toISOString().split("T")[0]}
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
