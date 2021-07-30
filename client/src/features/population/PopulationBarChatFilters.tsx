import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Header,
  Icon,
  Input,
  List,
  Segment,
} from "semantic-ui-react";
import { Loading } from "../../app/layout/Loading";

import { useStore } from "../../app/stores/store";

const PopulationBarChatFilters = () => {
  const { populationStore } = useStore();
  const { countryPopulations, toggleSelected } = populationStore;

  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  if (!countryPopulations) return <Loading content="loading" />;

  return (
    <Segment>
      <Header>Countries</Header>

      <Input
        value={query}
        onChange={handleInputChange}
        icon
        iconPosition="left"
        fluid
        placeholder="Search countries..."
        action
      >
        <Icon name="search" />
        <input />
        <Button icon="close" onClick={() => setQuery("")} />
      </Input>
      <Divider />
      <div
        style={{ padding: "0 0.5rem", overflow: "auto", maxHeight: "450px" }}
      >
        <List relaxed>
          {countryPopulations
            .filter((x) =>
              x.country.toLowerCase().includes(query.toLowerCase())
            )
            .sort((a, b) => a.country.localeCompare(b.country))
            .map((x) => (
              <List.Item key={x.id}>
                <Checkbox
                  label={x.country}
                  defaultChecked={x.selected}
                  onClick={() => toggleSelected(x.id)}
                />
              </List.Item>
            ))}
        </List>
      </div>
    </Segment>
  );
};

export { PopulationBarChatFilters };
