import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CovidStore from "./covidStore";
import PopulationStore from "./populationStore";
import VaccinationStore from "./vaccinatedStore";

interface Store {
  activityStore: ActivityStore;
  populationStore: PopulationStore;
  vaccinationStore: VaccinationStore;
  covidStore: CovidStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  populationStore: new PopulationStore(),
  vaccinationStore: new VaccinationStore(),
  covidStore: new CovidStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
