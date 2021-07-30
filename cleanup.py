import pandas as pd
import numpy as np

df = pd.read_csv('./owid-covid-data.csv')

print(df)

cols = ["location", "date", "total_cases", "total_deaths", "population"]
df = df[cols]
df.dropna(inplace=True)
df["cases_per_million"] = df["total_cases"]/df["population"] * 1000000.0
df["deaths_per_million"] = df["total_deaths"]/df["population"] * 1000000.0
print(df)

# df.to_csv(r'covid_data.csv')