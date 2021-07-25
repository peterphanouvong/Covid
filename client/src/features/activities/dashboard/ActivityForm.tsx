import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";

import { useStore } from "../../../app/stores/store";
import { Loading } from "../../../app/layout/Loading";

const _ActivityForm = () => {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading: submitting,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams<{ id: string }>();

  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setInputs(activity!));
  }, [id, loadActivity]);

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

  const history = useHistory();

  const handleSubmit = () => {
    if (inputs.id.length === 0) {
      let newActivity = {
        ...inputs,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        return history.push(`/activities/${newActivity.id}`);
      });
    } else {
      updateActivity(inputs).then(() => {
        return history.push(`/activities/${inputs.id}`);
      });
    }
  };

  if (loadingInitial) return <Loading content="loading activity..." />;

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
            as={Link}
            to="/activities"
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

export const ActivityForm = observer(_ActivityForm);
