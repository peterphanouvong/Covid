import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

import { useStore } from "../../../app/stores/store";

const _ActivityForm = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    closeForm,
    createActivity,
    updateActivity,
    loading: submitting,
  } = activityStore;

  const initialState = activity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [inputs, setInputs] = useState(initialState);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(inputs);
    // createOrEdit(inputs);
    activity ? updateActivity(inputs) : createActivity(inputs);
  };

  return (
    <Segment clearing>
      <Form>
        <Form.Input
          placeholder="Title"
          name="title"
          value={inputs.title}
          onChange={handleChange}
        />
        <Form.TextArea
          placeholder="Description"
          name="description"
          value={inputs.description}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Description"
          name="date"
          type="date"
          value={inputs.date}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={inputs.category}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="City"
          name="city"
          value={inputs.city}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          value={inputs.venue}
          onChange={handleChange}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={closeForm} basic type="submit" content="Cancel" />
          <Button
            loading={submitting}
            onClick={handleSubmit}
            type="submit"
            content="Submit"
          />
        </div>
      </Form>
    </Segment>
  );
};

export const ActivityForm = observer(_ActivityForm);
