import { makeAutoObservable } from "mobx";
import * as d3 from "d3";
import { v4 as uuid } from "uuid";

import { CountryPopulation } from "../models/countryPopulation";

export default class PopulationStore {
  countryPopulations: CountryPopulation[] | undefined = undefined;
  selectedCountryPopulation: CountryPopulation | undefined = undefined;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get selectedCountryPopulations() {
    return this.countryPopulations?.filter((x) => x.selected === true);
  }

  loadCountryPopulations = async () => {
    this.setLoadingInitial(true);
    try {
      const countryPops = await d3.dsv(
        ",",
        "https://gist.githubusercontent.com/peterphanouvong/f1d9a63cee811bd1b1f7140cc81668cd/raw/22c1cdff272819788c5c81d17136f2e8ad25d817/population.csv",
        (d) => {
          return ({
            id: uuid(),
            country: d.Country,
            population: d[2002],
            selected: false,
          } as unknown) as CountryPopulation;
        }
      );
      console.log("countryPops", countryPops);
      this.setCountryPopulations(
        countryPops.map((d, i) => {
          if (i < 5) return { ...d, selected: true };
          return d;
        })
      );
      this.setLoadingInitial(false);
    } catch (err) {
      console.log(err);
      this.setLoadingInitial(false);
    }
  };

  setCountryPopulations = (cps: CountryPopulation[] | undefined) => {
    this.countryPopulations = cps;
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  setSelectedCountryPopulation = (cp: CountryPopulation) => {
    this.selectedCountryPopulation = cp;
  };

  toggleSelected = (id: string) => {
    this.countryPopulations = this.countryPopulations?.map((x) => {
      if (x.id === id) {
        if (x.selected === false) this.setSelectedCountryPopulation(x);
        return { ...x, selected: !x.selected };
      }
      return x;
    });
  };
}
