import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity | undefined;
  handleFormClose: () => void;
  handleSubmitActivityForm: (activity: Activity) => void;
  submitting: boolean;
}

const ActivityForm = ({
  activity,
  handleFormClose,
  handleSubmitActivityForm,
  submitting,
}: Props) => {
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
    handleSubmitActivityForm(inputs);
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
          <Button
            onClick={handleFormClose}
            basic
            type="submit"
            content="Cancel"
          />
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

export { ActivityForm };
