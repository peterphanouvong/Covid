import { makeAutoObservable } from "mobx";
import * as d3 from "d3";
import { v4 as uuid } from "uuid";

import { Vac } from "../models/vac";
import { compareAsc } from "date-fns";

interface Location {
  id: string;
  name: string;
  selected: boolean;
}

export default class VaccinationStore {
  vaccinationRegistry = new Map<string, Vac>();
  vaccinations: Vac[] | undefined = undefined;
  locations: Location[] = [
    { id: uuid(), name: "United States", selected: true },
  ];
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get selectedLocations() {
    return this.locations.filter((x) => x.selected === true);
  }

  get sortedVaccinations() {
    return Array.from(this.vaccinationRegistry.values()).sort((a, b) => {
      if (a.location === b.location) return compareAsc(a.date, b.date);
      return a.location.toLowerCase().localeCompare(b.location.toLowerCase());
    });
  }

  get vaccinationsGroupedByLocation() {
    return Object.entries(
      this.sortedVaccinations.reduce((vs, v) => {
        const location = v.location;
        vs[location] = vs[location] ? [...vs[location], v] : [v];
        return vs;
      }, {} as { [key: string]: Vac[] })
    );
  }

  get selectedVaccinations() {
    return this.vaccinations?.filter((d, i) =>
      this.selectedLocations.find((x) => x.name === d.location)
    );
  }

  loadVaccinationPercentages = async () => {
    this.setLoadingInitial(true);
    try {
      const vps = await d3.dsv(
        ",",
        "https://gist.githubusercontent.com/peterphanouvong/5a5b1414d4200163529b19d82ac5e790/raw/covid_data.csv",
        (d) => {
          return ({
            id: uuid(),
            location: d.location,
            date: d3.timeParse("%Y-%m-%d")(d.date!),
            cases_per_million: d.cases_per_million,
          } as unknown) as Vac;
        }
      );
      this.setVaccinations(vps.sort((a, b) => compareAsc(a.date, b.date)));
      vps.forEach((vp) => {
        if (!this.locations.find((x) => x.name === vp.location))
          this.setLocation(vp.location);
      });
      // vps
      //   .filter((d, i) => d.location === "Australia")
      //   .forEach((vp) => this.setVaccination(vp));
      this.setLoadingInitial(false);
    } catch (err) {
      console.log(err);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  setVaccinations = (vs: Vac[]) => {
    this.vaccinations = vs;
  };

  setLocation = (name: string) => {
    this.locations.push({
      id: uuid(),
      name: name,
      selected: false,
    } as Location);
  };

  toggleSelected = (id: string) => {
    this.locations = this.locations.map((x) => {
      if (x.id === id)
        return {
          ...x,
          selected: !x.selected,
        };
      return x;
    });
  };

  private setVaccination = (v: Vac) => {
    this.vaccinationRegistry.set(v.id, v);
  };
}
