import { makeAutoObservable, runInAction } from "mobx";
import * as d3 from "d3";
import { v4 as uuid } from "uuid";
import { CovidData } from "../models/covidData";

export default class CovidStore {
  covidData: CovidData[] | undefined = undefined;
  selectedLocations: string[] = [
    "United States",
    "France",
    "United Kingdom",
    "Belgium",
  ];
  locations: string[] = [];
  loadingInitial = false;
  overlayActive = false;

  constructor() {
    makeAutoObservable(this);
  }

  get filteredCovidData() {
    return this.covidData?.filter((x) =>
      this.selectedLocations.includes(x.location)
    );
  }

  loadCovidData = async () => {
    this.setLoadingInitial(true);
    try {
      const raw_data = await d3.dsv(
        ",",
        "https://gist.githubusercontent.com/peterphanouvong/5a5b1414d4200163529b19d82ac5e790/raw/covid_data.csv",
        (d) => {
          return ({
            id: uuid(),
            date: d3.timeParse("%Y-%m-%d")(d.date!),
            location: d.location,
            total_cases: d.total_cases,
            total_deaths: d.total_deaths,
            population: d.population,
            cases_per_million: d.cases_per_million,
            deaths_per_million: d.deaths_per_million,
          } as unknown) as CovidData;
        }
      );
      runInAction(() => {
        this.covidData = raw_data;
        // @ts-ignore
        this.locations = [...new Set(raw_data.map((x) => x.location))];
      });
      this.setLoadingInitial(false);
    } catch (err) {
      console.log(err);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  toggleSelected = (location: string) => {
    const index = this.selectedLocations.indexOf(location);
    if (index > -1) {
      this.selectedLocations.splice(index, 1);
    } else {
      this.selectedLocations.push(location);
    }
  };

  setOverlay = (state: boolean) => {
    this.overlayActive = state;
  };
}
