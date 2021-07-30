import { observer } from "mobx-react-lite";
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
import { useStore } from "../../app/stores/store";

const _CasesGraphFilters = () => {
  const { covidStore } = useStore();
  const { selectedLocations, locations, toggleSelected } = covidStore;

  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // if (loadingInitial) return <Loading content="Loading" />;
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
          {locations
            .filter((x) => x.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => a.localeCompare(b))
            .map((x) => (
              <List.Item key={x}>
                <Checkbox
                  label={x}
                  defaultChecked={selectedLocations.includes(x)}
                  onClick={() => toggleSelected(x)}
                />
              </List.Item>
            ))}
        </List>
      </div>
    </Segment>
  );
};

export const CasesGraphFilters = observer(_CasesGraphFilters);
