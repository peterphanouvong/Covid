const colors = [
  "#007AFE",
  "#FF9400",
  "#35C659",
  "#FF2C55",
  "#FFCC05",
  "#AF52DE",
  "#5956D5",
  "#FF3C2F",
  "#30B0C7",
];

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getColor = (index: number) => {
  return colors[index % colors.length];
};
