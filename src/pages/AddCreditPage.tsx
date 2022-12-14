import { useEffect, useReducer, useState } from "react";
import { Button, Form, Input } from "reactstrap";
import { url } from "../config";
import { option } from "../types";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import { useGetUsers } from "../hooks/useGetUsers";

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

export const AddCreditPage = () => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      handleAddCredit();
      setSubmitting(false);
    }, 1000);
  };

  const handleAddCredit = () => {
    const keys: number[] = [];
    optionSelected?.forEach(({ value }) => keys.push(value));

    fetch(`${url}/api/addCredit`, {
      method: "PUT",
      body: JSON.stringify({
        credit: formData.credit,
        id: keys,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).catch((error) => console.log("error", error));
  };
  const { users } = useGetUsers();
  const [usersOption, setUsersOption] = useState<option[]>();

  useEffect(() => {
    if (users) {
      const options = users.map(({ id, login }) => ({
        value: id,
        label: login,
      }));
      setUsersOption(options);
    }
  }, [users]);

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
      <h1>Add Credit</h1>
      {submitting && <div>Submtting Form...</div>}
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Input
          type="number"
          name="credit"
          onChange={setFormData}
          placeholder="Price"
          step="0.01"
          min="0"
          required
          disabled={submitting}
        ></Input>

        <span
          data-toggle="popover"
          data-trigger="focus"
          data-content="Please selecet"
        >
          <ReactSelect
            isDisabled={submitting}
            required
            options={usersOption}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            placeholder="Add Users"
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
