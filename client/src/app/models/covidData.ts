export interface CovidData {
  location: string;
  date: Date;
  total_cases: number;
  total_deaths: number;
  population: number;
  cases_per_million: number;
  deaths_per_million: number;
}
